import express from "express";
import cors from "cors";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";

import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: ENV.CLIENT_URL,
    credentials: true,
  })
);

app.use(clerkMiddleware());

// Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

// Health Check
app.get("/health", (req, res) => {
  res.status(200).json({
    msg: "api is up and running",
  });
});

const startServer = async () => {
  try {
    await connectDB();

    const PORT = ENV.PORT || 3000;

    app.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });
  } catch (error) {
    console.error("💥 Error starting the server", error);
  }
};

startServer();