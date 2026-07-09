import { chatClient, streamClient } from "../lib/stream.js";
import Session from "../models/Session.js";
import mongoose from "mongoose";

const VALID_DIFFICULTIES = new Set(["easy", "medium", "hard"]);

async function populateSession(sessionId) {
  return Session.findById(sessionId)
    .populate("host", "name profileImage email clerkId")
    .populate("participant", "name profileImage email clerkId");
}

async function ensureStreamUser(user) {
  await chatClient.upsertUser({
    id: user.clerkId,
    name: user.name,
    image: user.profileImage,
  });
}

export async function createSession(req, res) {
  try {
    const problem = typeof req.body.problem === "string" ? req.body.problem.trim() : "";
    const difficulty =
      typeof req.body.difficulty === "string" ? req.body.difficulty.toLowerCase() : "";
    const userId = req.user._id;
    const clerkId = req.user.clerkId;

    if (!problem || !difficulty) {
      return res.status(400).json({ message: "Problem and difficulty are required" });
    }

    if (!VALID_DIFFICULTIES.has(difficulty)) {
      return res.status(400).json({ message: "Difficulty must be easy, medium, or hard" });
    }

    const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    await ensureStreamUser(req.user);

    // Create Stream video call
    await streamClient.video.call("default", callId).getOrCreate({
      data: {
        created_by_id: clerkId,
        custom: { problem, difficulty },
      },
    });

    // Create Stream chat channel
    const channel = chatClient.channel("messaging", callId, {
      name: `${problem} Session`,
      created_by_id: clerkId,
      members: [clerkId],
    });

    await channel.create();

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
    console.error("Error in createSession controller:", error);
    res.status(500).json({
      message: error.message || "Error creating session. Please try again.",
    });
  }
}

export async function getActiveSessions(_, res) {
  try {
    const sessions = await Session.find({ status: "active" })
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({ sessions });
  } catch (error) {
    console.log("Error in getActiveSessions controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyActiveSessions(req, res) {
  try {
    const userId = req.user._id;

    const sessions = await Session.find({ status: "active", host: userId })
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

    try {
      await ensureStreamUser(req.user);
      const channel = chatClient.channel("messaging", session.callId);
      await channel.addMembers([clerkId]);
    } catch (channelError) {
      throw channelError;
    }

    session.participant = userId;
    await session.save();

    const populatedSession = await populateSession(session._id);

    res.status(200).json({ session: populatedSession });
  } catch (error) {
    console.log("Error in joinByCode controller:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getMyRecentSessions(req, res) {
  try {
    const userId = req.user._id;

    const filter = { status: "completed", $or: [{ host: userId }, { participant: userId }] };

    const total = await Session.countDocuments(filter);

    const sessions = await Session.find(filter)
      .populate("host", "name profileImage email clerkId")
      .populate("participant", "name profileImage email clerkId")
      .sort({ createdAt: -1 })
      .limit(7);

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

    try {
      await ensureStreamUser(req.user);
      const channel = chatClient.channel("messaging", session.callId);
      await channel.addMembers([clerkId]);
    } catch (channelError) {
      throw channelError;
    }

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

    // Delete Stream video call
    const call = streamClient.video.call("default", session.callId);
    await call.delete({ hard: true });

    // Delete Stream chat channel
    const channel = chatClient.channel("messaging", session.callId);
    await channel.delete();

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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid session id" });
    }

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
