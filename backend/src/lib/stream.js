// stream api for chat and video call features

// stream sdk imports
import { StreamChat } from "stream-chat"; //for chat features
import { StreamClient } from "@stream-io/node-sdk"; //for video call features

import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecret = ENV.STREAM_API_SECRET;

// Initialize the Stream clients for chat and video call features
export const chatClient = StreamChat.getInstance(apiKey, apiSecret); // will be used chat features
export const streamClient = new StreamClient(apiKey, apiSecret); // will be used for video calls

// upsert a user in stream chat and video call features
// uses the same user id as the Clerk user id, so that auth and identity are always the same string
// note: video calls don't have their own separate "user" - chat and video
// share one user list per Stream account, so upserting here is enough for both
export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUser(userData);
    console.log("Stream user upserted successfully:", userData.id);
  } catch (error) {
    console.error("Error upserting Stream user:", error);
    throw error;
  }
};

// delete a user in stream chat and video call features
export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.deleteUser(userId);
    console.log("Stream user deleted successfully:", userId);
  } catch (error) {
    console.error("Error deleting the Stream user:", error);
    throw error;
  }
};



// Here's how stream api works under the hood for chat and video call features:
//
// 1. One Stream account runs both chat and video. Same API key/secret for
//    both, just two different clients (chatClient and streamClient above).
//
// 2. Everyone needs a "Stream user" before they can chat or call. We reuse
//    each person's Clerk login id as their Stream user id too, so it's one
//    id for both instead of two ids we'd have to keep matching up.
//
// 3. The secret key never leaves this backend. All we send the frontend is a
//    short-lived signed token (made in chatController.js) that proves who
//    the user is. The browser hands that token straight to Stream, and
//    Stream checks it - this server is never in the middle of that check.
//
// 4. A chat "channel" and a video "call" are two separate things as far as
//    Stream is concerned. We just give them the same id (the session's
//    callId) so they always line up with one session in our own database.
//
// 5. Once a call starts, the actual messages and video/audio travel directly
//    between the browser and Stream - not through this backend. This server
//    only handles the setup steps: create, join, leave, end, and handing out
//    tokens.
