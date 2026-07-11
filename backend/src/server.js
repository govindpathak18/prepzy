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

const allowedOrigins = [
  ENV.CLIENT_URL,
  "http://localhost:5173",
  "https://localhost:5173",
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  if (allowedOrigins.includes(origin)) return true;
  if (/^https:\/\/.*\.vercel\.app$/i.test(origin)) return true;

  return false;
};

app.use(
  cors({
    origin: (incomingOrigin, callback) => {
      if (isAllowedOrigin(incomingOrigin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS policy violation: origin ${incomingOrigin} is not allowed`));
    },
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
