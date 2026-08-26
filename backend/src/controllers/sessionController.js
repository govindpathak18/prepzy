import { chatClient, streamClient, upsertStreamUser } from "../lib/stream.js";
import Session from "../models/Session.js";

const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard"]);

// populate a session with host and participant details
async function populateSession(sessionId) {
  return Session.findById(sessionId)
    .populate("host", "name profileImage email clerkId")
    .populate("participant", "name profileImage email clerkId");
}

// Thin wrapper around the shared upsertStreamUser (lib/stream.js) so call
// sites here can just pass a Mongo user document instead of building the
// {id, name, image} shape themselves each time.
async function ensureStreamUser(user) {
  await upsertStreamUser({
    id: user.clerkId,
    name: user.name,
    image: user.profileImage,
  });
}

export async function createSession(req, res) {
  try {
    const problem = typeof req.body.problem === "string" ? req.body.problem.trim() : "";
    const difficulty = typeof req.body.difficulty === "string" ? req.body.difficulty.toLowerCase() : "";
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Problem and difficulty are required" });
    }

    if (!VALID_DIFFICULTIES.has(difficulty)) {
      return res.status(400).json({ message: "Difficulty must be easy, medium, or hard" });
    }

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

   // Track whether we successfully created Stream resources so we can clean up
    let videoCallCreated = false;
    let chatChannelCreated = false;

    try {
      await ensureStreamUser(req.user);

      // Create Stream video call
      await streamClient.video.call("default", callId).getOrCreate({
        data: {
          created_by_id: clerkId,
          custom: { problem, difficulty },
        },
      });
      videoCallCreated = true;

      // Create Stream chat channel
      const channel = chatClient.channel("messaging", callId, {
        name: `${problem} Session`,
        created_by_id: clerkId,
        members: [clerkId],
      });
      await channel.create();
      chatChannelCreated = true;

      // Only after Stream succeeds → save session in DB
      const createdSession = await Session.create({
        problem,
        difficulty,
        host: userId,
        callId,
      });

      const session = await populateSession(createdSession._id);

      res.status(201).json({ session });
    } catch (error) {
      // If we created any Stream resources but then failed to save the session in DB,
      if (chatChannelCreated) {
        try {
          await chatClient.channel("messaging", callId).delete();
        } catch (cleanupError) {
          console.error("Failed to clean up orphaned Stream channel:", cleanupError);
        }
      }
      if (videoCallCreated) {
        try {
          await streamClient.video.call("default", callId).delete({ hard: true });
        } catch (cleanupError) {
          console.error("Failed to clean up orphaned Stream video call:", cleanupError);
        }
      }

      throw error;
    }
  } catch (error) {
    console.error("Error in createSession controller:", error);
    res.status(500).json({
      message: error.message || "Error creating session. Please try again.",
    });
  }
}

// get all active sessions for the authenticated user (host or participant)
export async function getMyActiveSessions(req, res) {
  try {
    const userId = req.user._id;

    // host OR participant -> same "sessions relevant to me" shape as
    // getMyRecentSessions below, so a session you joined (not just one you
    // created) still shows up here and can be rejoined.
    const sessions = await Session.find({
      status: "active",
      $or: [{ host: userId }, { participant: userId }],
    })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getMyActiveSessions controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// join a sessison as a participant by session code (callId)
export async function joinByCode(req, res) {
  try {
    const { code } = req.body;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!code || typeof code !== "string") {
      return res.status(400).json({ message: "Invalid code" });
    }

    // Find session by callId (callId acts as the session code)
    const session = await Session.findOne({ callId: code });
    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.status !== "active") {
      return res.status(400).json({ message: "Cannot join a completed session" });
    }

    if (session.host.toString() === userId.toString()) {
      return res.status(400).json({ message: "Host cannot join their own session as participant" });
    }

    if (session.participant) return res.status(409).json({ message: "Session is full" });

    await ensureStreamUser(req.user);
    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    session.participant = userId;
    await session.save();

    const populatedSession = await populateSession(session._id);

    res.status(200).json({ session: populatedSession });
  } catch (error) {
    console.log("Error in joinByCode controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

// get all completed sessions for the authenticated user (host or participant)
export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;

    const filter = { status: "completed", $or: [{ host: userId }, { participant: userId }] };

    const total = await Session.countDocuments(filter);

    const sessions = await Session.find(filter)
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({ sessions, total });
  } catch (error) {
    console.log("Error in getMyRecentSessions controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getSessionById(req, res) {
  try {
    const { id } = req.params;

    const session = await Session.findById(id)
      .populate("host", "name email profileImage clerkId")
      .populate("participant", "name email profileImage clerkId");

    if (!session) return res.status(404).json({ message: "Session not found" });

    res.status(200).json({ session });
  } catch (error) {
    console.log("Error in getSessionById controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function joinSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.status !== "active") {
      return res.status(400).json({ message: "Cannot join a completed session" });
    }

    if (session.host.toString() === userId.toString()) {
      return res.status(400).json({ message: "Host cannot join their own session as participant" });
    }

    if (session.participant) return res.status(409).json({ message: "Session is full" });

    await ensureStreamUser(req.user);
    const channel = chatClient.channel("messaging", session.callId);
    await channel.addMembers([clerkId]);

    session.participant = userId;
    await session.save();

    const populatedSession = await populateSession(session._id);

    res.status(200).json({ session: populatedSession });
  } catch (error) {
    console.log("Error in joinSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function endSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.host.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Only the host can end the session" });
    }

    if (session.status === "completed") {
      return res.status(400).json({ message: "Session is already completed" });
    }

    // Delete Stream video call and chat channel, but don't let a failure
    // here block marking the session completed - a resource that's already
    // gone (e.g. a retried end after a previous partial failure) would
    // otherwise throw again on every retry, leaving the session stuck
    // "active" forever with no way to successfully end it.
    try {
      const call = streamClient.video.call("default", session.callId);
      await call.delete({ hard: true });
    } catch (cleanupError) {
      console.error("Failed to delete Stream video call on end:", cleanupError);
    }

    try {
      const channel = chatClient.channel("messaging", session.callId);
      await channel.delete();
    } catch (cleanupError) {
      console.error("Failed to delete Stream chat channel on end:", cleanupError);
    }

    session.status = "completed";
    await session.save();

    res.status(200).json({ session, message: "Session ended successfully" });
  } catch (error) {
    console.log("Error in endSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function deletePastSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // id format is already validated by router.param("id", ...) in
    // sessionRoutes.js before this handler ever runs.
    const session = await Session.findById(id);

    if (!session) return res.status(404).json({ message: "Session not found" });

    if (session.status !== "completed") {
      return res.status(400).json({ message: "Only completed sessions can be deleted" });
    }

    const isHost = session.host.toString() === userId.toString();
    const isParticipant = session.participant?.toString() === userId.toString();

    if (!isHost && !isParticipant) {
      return res.status(403).json({ message: "You are not allowed to delete this session" });
    }

    await session.deleteOne();

    res.status(200).json({ message: "Past session deleted successfully" });
  } catch (error) {
    console.log("Error in deletePastSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function leaveSession(req, res) {
  try {
    const { id } = req.params;
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    const session = await Session.findById(id);
    if (!session) return res.status(404).json({ message: "Session not found" });

    // only participant can call leave to remove themselves
    const isParticipant = session.participant?.toString() === userId.toString();
    const isHost = session.host.toString() === userId.toString();

    if (!isParticipant && !isHost) {
      return res.status(403).json({ message: "You are not part of this session" });
    }

    // If participant is leaving, remove them
    if (isParticipant) {
      try {
        const channel = chatClient.channel("messaging", session.callId);
        await channel.removeMembers([clerkId]);
      } catch (err) {
        console.warn("Failed removing chat member on leave:", err?.message || err);
      }

      session.participant = null;
      await session.save();

      const populated = await populateSession(session._id);
      return res.status(200).json({ session: populated, message: "Left session" });
    }

    // If host is leaving, disallow (host should end session instead)
    if (isHost) {
      return res.status(400).json({ message: "Host cannot leave session. End the session instead." });
    }
  } catch (error) {
    console.log("Error in leaveSession controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
