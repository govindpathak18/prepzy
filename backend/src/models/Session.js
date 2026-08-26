import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    problem: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      required: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    status: {
      type: String,
      enum: ["active", "completed"],
      default: "active",
    },
    // stream video call ID -> also doubles as the shareable session code
    // used by joinByCode, so it must be unique.
    callId: {
      type: String,
      default: "",
      unique: true,
    },
  },
  { timestamps: true }
);

// Indexes matching the actual query patterns in sessionController.js, so
// these stay fast (index scan, not full collection scan) as the sessions
// collection grows:
// - getMyActiveSessions:  { status: "active"/"completed", host: userId }
// - getMyRecentSessions:  { status: "active"/"completed", $or: [{ host }, { participant }] }
sessionSchema.index({ status: 1, host: 1 });
sessionSchema.index({ status: 1, participant: 1 });

const Session = mongoose.model("Session", sessionSchema);

export default Session;