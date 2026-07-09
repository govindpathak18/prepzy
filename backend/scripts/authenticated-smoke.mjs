/**
 * Authenticated smoke test using Clerk session token.
 * Requires a valid Clerk user in MongoDB and CLERK_SECRET_KEY in .env.
 *
 * Usage: node scripts/authenticated-smoke.mjs
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { createClerkClient } from "@clerk/backend";

dotenv.config({ quiet: true });

import User from "../src/models/User.js";
import Session from "../src/models/Session.js";

const BASE = process.env.API_BASE || "http://localhost:3000";

const clerk = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function getBearerToken(clerkId) {
  const { data: users } = await clerk.users.getUserList({ userId: [clerkId], limit: 1 });
  if (!users.length) throw new Error(`Clerk user not found: ${clerkId}`);

  const { data: sessions } = await clerk.sessions.getSessionList({
    userId: clerkId,
    status: "active",
    limit: 1,
  });

  if (!sessions.length) {
    throw new Error(
      `No active Clerk session for ${clerkId}. Sign in via the frontend first, then rerun.`
    );
  }

  return clerk.sessions.getToken(sessions[0].id);
}

async function api(method, path, token, body) {
  const init = {
    method,
    redirect: "manual",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (body !== undefined) {
    init.headers["Content-Type"] = "application/json";
    init.body = JSON.stringify(body);
  }

  const res = await fetch(`${BASE}${path}`, init);
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = text.slice(0, 200);
  }

  return { status: res.status, json };
}

async function main() {
  await mongoose.connect(process.env.DB_URL);
  const user = await User.findOne().sort({ updatedAt: -1 });

  if (!user) {
    console.log("SKIP: No users in database. Sign in via frontend first.");
    process.exit(0);
  }

  console.log(`Using user: ${user.name} (${user.clerkId})`);

  let token;
  try {
    token = await getBearerToken(user.clerkId);
  } catch (error) {
    console.log(`SKIP: ${error.message}`);
    process.exit(0);
  }

  const tests = [];

  // Chat token
  const chat = await api("GET", "/api/chat/token", token);
  tests.push({ name: "GET /api/chat/token", ok: chat.status === 200 && chat.json.token });

  // Active sessions
  const active = await api("GET", "/api/sessions/active", token);
  tests.push({ name: "GET /api/sessions/active", ok: active.status === 200 && Array.isArray(active.json.sessions) });

  // My recent sessions
  const recent = await api("GET", "/api/sessions/my-recent", token);
  tests.push({ name: "GET /api/sessions/my-recent", ok: recent.status === 200 && Array.isArray(recent.json.sessions) });

  // (AI session tests removed)

  // Create coding session validation (missing fields)
  const badCreate = await api("POST", "/api/sessions", token, {});
  tests.push({ name: "POST /api/sessions validation", ok: badCreate.status === 400 });

  for (const t of tests) {
    console.log(`${t.ok ? "PASS" : "FAIL"} ${t.name}`);
  }

  const failed = tests.filter((t) => !t.ok).length;
  console.log(`\nAuthenticated smoke: ${tests.length - failed}/${tests.length} passed`);

  await mongoose.disconnect();
  process.exit(failed ? 1 : 0);
}

main().catch(async (error) => {
  console.error("Smoke test error:", error.message);
  await mongoose.disconnect().catch(() => { });
  process.exit(1);
});
