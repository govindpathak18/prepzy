import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { ProtectRoute } from "../middlewares/protectRoutes.js";

const router = express.Router();

// Get Stream token for authenticated user (for both chat and video)
router.get("/token",ProtectRoute,getStreamToken)

export default router;