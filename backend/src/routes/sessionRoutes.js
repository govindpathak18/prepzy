import express from "express";
import { ProtectRoute } from "../middlewares/protectRoutes.js";
import {
     createSession,
     deletePastSession,
     endSession,
     getActiveSessions,
     getMyRecentSessions,
     getSessionById,
     joinSession,
     getMyActiveSessions,
     joinByCode,
     leaveSession,
} from "../controllers/sessionController.js";

const router = express.Router();


router.post("/", ProtectRoute, createSession) //create session => post route
router.get("/active", ProtectRoute, getActiveSessions) //get the active/live sessions
router.get("/my-active", ProtectRoute, getMyActiveSessions) // get active sessions for current user
router.get("/my-recent", ProtectRoute, getMyRecentSessions) //get the completed/past sessions

router.post("/join-by-code", ProtectRoute, joinByCode) // join session by code

router.post("/:id/leave", ProtectRoute, leaveSession) // participant leaves the session

router.get("/:id", ProtectRoute, getSessionById) //get the session from its id
router.post("/:id/join", ProtectRoute, joinSession) //join the session from its id
router.post("/:id/end", ProtectRoute, endSession) //get the session from its id
router.delete("/:id", ProtectRoute, deletePastSession) //delete a completed/past session

export default router;
