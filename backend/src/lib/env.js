import dotenv from "dotenv";

dotenv.config({ quiet: true });

const requiredEnvVars = [
  "PORT",
  "DB_URL",
  "NODE_ENV",
  "CLIENT_URL",
  "INNGEST_EVENT_KEY",
  "INNGEST_SIGNING_KEY",
  "STREAM_API_KEY",
  "STREAM_API_SECRET",
  "CLERK_PUBLISHABLE_KEY",
  "CLERK_SECRET_KEY",
];

// Check for missing required environment variables and exit if any are missing
const missingVars = requiredEnvVars.filter((v) => !process.env[v]);

if (missingVars.length > 0) {
  console.error(
    "❌ Missing required environment variables:",
    missingVars.join(", ")
  );
  console.error("Please check your .env file");
  process.exit(1);
}

export const ENV = {
  PORT: process.env.PORT,
  DB_URL: process.env.DB_URL,

  NODE_ENV: process.env.NODE_ENV,
  CLIENT_URL: process.env.CLIENT_URL,

  INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
  INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,

  STREAM_API_KEY: process.env.STREAM_API_KEY,
  STREAM_API_SECRET: process.env.STREAM_API_SECRET,

  CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
  CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
};
