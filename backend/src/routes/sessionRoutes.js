import express from "express";
import mongoose from "mongoose";
import { ProtectRoute } from "../middlewares/protectRoutes.js";
import { sensitiveActionLimiter } from "../lib/rateLimit.js";
import {
     createSession,
     deletePastSession,
     endSession,
     getMyRecentSessions,
     getSessionById,
     joinSession,
     getMyActiveSessions,
     joinByCode,
     leaveSession,
} from "../controllers/sessionController.js";

const router = express.Router();

// Validates :id once for every route below that uses it, instead of each
// controller repeating (or forgetting) the check - a malformed id now
// consistently returns 400 instead of falling through to a generic 500.
router.param("id", (_req, res, next, id) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid session id" });
  }
  next();
});

router.post("/", ProtectRoute, sensitiveActionLimiter, createSession) //create session => post route
router.get("/my-active", ProtectRoute, getMyActiveSessions) // get active sessions for current user
router.get("/my-recent", ProtectRoute, getMyRecentSessions) //get the completed/past sessions

router.post("/join-by-code", ProtectRoute, sensitiveActionLimiter, joinByCode) // join session by code

router.post("/:id/leave", ProtectRoute, leaveSession) // participant leaves the session

router.get("/:id", ProtectRoute, getSessionById) //get the session from its id
router.post("/:id/join", ProtectRoute, joinSession) //join the session from its id
router.post("/:id/end", ProtectRoute, endSession) //get the session from its id
router.delete("/:id", ProtectRoute, deletePastSession) //delete a completed/past session

export default router;
