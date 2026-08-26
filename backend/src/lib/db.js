import mongoose from "mongoose";

import { ENV } from "./env.js";

// Logged once so repeated connectDB() calls (e.g. from Inngest functions)
// don't attach duplicate listeners on the shared default connection.
mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});
mongoose.connection.on("disconnected", () => {
  console.warn("MongoDB disconnected");
});
mongoose.connection.on("reconnected", () => {
  console.log("MongoDB reconnected");
});

export const connectDB = async () => {
  // ENV.DB_URL is guaranteed set here -> env.js exits at boot if it's missing.
  const options = { serverSelectionTimeoutMS: 5000 };
  const conn = await mongoose.connect(ENV.DB_URL, options);
  console.log(`MongoDB connected: ${conn.connection.host}`);
  return conn.connection;
};
