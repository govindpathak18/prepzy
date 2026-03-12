import express from "express";
import { getStreamToken } from "../controllers/chatController.js";
import { ProtectRoute } from "../middlewares/protectRoutes.js";

const router = express.Router();

router.get("/token",ProtectRoute,getStreamToken)

export default router;