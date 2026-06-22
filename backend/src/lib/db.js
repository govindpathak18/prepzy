import mongoose from "mongoose";

import { ENV } from "./env.js";

export const connectDB = async () => {
  try {
    if (!ENV.DB_URL) {
      throw new Error("DB_URL is not defined in environment variables");
    }

    console.log("🔄 Connecting to MongoDB...");
    const conn = await mongoose.connect(ENV.DB_URL, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Connected to MongoDB:", conn.connection.host);
  } catch (error) {
    console.error("❌ Error connecting to MongoDB");

    if (error.code === "ECONNREFUSED") {
      console.error(
        "   → Cannot reach MongoDB. Check your internet connection and MongoDB Atlas status."
      );
    } else if (error.message.includes("querySrv ECONNREFUSED")) {
      console.error(
        "   → Cannot resolve MongoDB Atlas domain. Check your internet connection."
      );
    } else if (error.message.includes("authentication failed")) {
      console.error(
        "   → Authentication failed. Check your DB_URL credentials in .env"
      );
    } else if (error.message.includes("IP whitelist")) {
      console.error(
        "   → Your IP address is not whitelisted. Add your IP to MongoDB Atlas Network Access."
      );
    } else {
      console.error("   →", error.message);
    }

    console.error(
      "\n📋 Debugging steps:"
    );
    console.error("   1. Verify your internet connection");
    console.error("   2. Check MongoDB Atlas IP whitelist (Security > Network Access)");
    console.error("   3. Verify DB_URL in .env file is correct");
    console.error("   4. Test DB_URL with MongoDB Compass or mongosh\n");

    process.exit(1);
  }
};
