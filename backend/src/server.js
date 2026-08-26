import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { serve } from "inngest/express";
import { clerkMiddleware } from "@clerk/express";

import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import { inngest, functions } from "./lib/inngest.js";
import { generalLimiter } from "./lib/rateLimit.js";


const app = express();

// Trust the first proxy hop in front of us (if any) 
// so that req.ip and req.protocol reflect the original client request
app.set("trust proxy", 1);

// Middleware
app.use(express.json());

const allowedOrigins = [
  ENV.CLIENT_URL,
  "http://localhost:5173",
  "https://localhost:5173",
  /^https:\/\/.*\.vercel\.app$/i,
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// Clerk middleware -> attaches req.auth() in evry request,
//  which can be used to get the current user and their session
app.use(clerkMiddleware());

// Inngest middleware -> serves the inngest client and functions at /api/inngest
app.use("/api/inngest", serve({ client: inngest, functions }));


// chat routes and session routes
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";
app.use("/api/chat", generalLimiter, chatRoutes);
app.use("/api/sessions", generalLimiter, sessionRoutes);

// Health Check -> also reports Mongo connectivity so a container/orchestrator
// health check can tell "up" apart from "up but can't reach the database"
app.get("/health", (req, res) => {
  const dbConnected = mongoose.connection.readyState === 1;

  res.status(dbConnected ? 200 : 503).json({
    msg: "prepzy api is up and running",
    db: dbConnected ? "connected" : "disconnected",
  });
});

// 404 handler -> every route above is registered by this point, so anything
// reaching here is genuinely unmatched. Keeps the response JSON instead of
// falling through to Express's default HTML "Cannot GET ..." page.
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Centralized error handler
app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(err.statusCode || err.status || 500).json({
    message: err.message || "Internal server error",
  });
});

const startServer = async () => {
  try {
    await connectDB();
    // ENV.PORT is guaranteed set here -> env.js exits at boot if it's missing.
    const PORT = ENV.PORT;
    const server = app.listen(PORT, () => {
      console.log("Server is running on port:", PORT);
    });

    // Graceful shutdown
    const shutdown = (signal) => {
      console.log(`${signal} received, shutting down gracefully...`);
      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    };
    process.on("SIGTERM", () => shutdown("SIGTERM"));
    process.on("SIGINT", () => shutdown("SIGINT"));
  } catch (error) {
    console.error("💥 Error starting the server", error);
    process.exit(1);
  }
};

startServer();
