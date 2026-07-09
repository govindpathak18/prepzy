import mongoose from "mongoose";

import { ENV } from "./env.js";

export const connectDB = async () => {
  if (!ENV.DB_URL) {
    throw new Error("Missing DB_URL environment variable");
  }

  const options = { serverSelectionTimeoutMS: 5000 };
  const conn = await mongoose.connect(ENV.DB_URL, options);
  console.log(`MongoDB connected: ${conn.connection.host}`);
  return conn.connection;
};
