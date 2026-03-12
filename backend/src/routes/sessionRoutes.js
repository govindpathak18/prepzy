import express from "express";
import { ProtectRoute } from "../middlewares/protectRoutes.js";
import { createSession,
     endSession,
      getActiveSessions,
       getMyRecentSessions,
        getSessionById,
         joinSession
         } from "../controllers/sessionController.js";

const router = express.Router();


router.post("/",ProtectRoute,createSession) //create session => post route
router.get("/active",ProtectRoute,getActiveSessions) //get the active/live sessions
router.get("/my-recent",ProtectRoute,getMyRecentSessions) //get the completed/past sessions

router.get("/:id",ProtectRoute,getSessionById) //get the session from its id
router.post("/:id/join",ProtectRoute,joinSession) //join the session from its id
router.post("/:id/end",ProtectRoute,endSession) //get the session from its id

export default router;