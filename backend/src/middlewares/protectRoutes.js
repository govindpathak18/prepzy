// middleware to protect routes and ensure the user is authenticated and exists in the database.

import { clerkClient, requireAuth } from "@clerk/express";
import { upsertStreamUser } from "../lib/stream.js"
import { getPrimaryEmail, getDisplayName, getProfileImage } from "../lib/clerkUser.js";
import User from "../models/User.js";

const DEFAULT_EDITOR_PREFERENCES = {
  defaultLanguage: "cpp",
  theme: "vs-dark",
};

// Sync the user with Stream API 
// when a user is created or updated in the database,
// we want to ensure that their information is also updated in Stream.
const syncStreamUser = async (user) => {
  await upsertStreamUser({
    id: user.clerkId.toString(),
    name: user.name,
    image: user.profileImage,
  });
};

// Create a new user in the database from Clerk data
const createUserFromClerk = async (clerkId) => {
  const clerkUser = await clerkClient.users.getUser(clerkId);

  const email = getPrimaryEmail(clerkUser, clerkId);
  const name = getDisplayName(clerkUser);
  const profileImage = getProfileImage(clerkUser);

  try {
    const user = await User.create({
      clerkId,
      email,
      name,
      profileImage,
      editorPreferences: DEFAULT_EDITOR_PREFERENCES,
    });

    await syncStreamUser(user);
    return user;
  } catch (error) {
    if (error.code === 11000 && error.keyPattern?.email) {
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        existingUser.clerkId = clerkId;
        existingUser.profileImage = profileImage;
        existingUser.name = name;
        existingUser.editorPreferences ||= DEFAULT_EDITOR_PREFERENCES;
        await existingUser.save();

        await syncStreamUser(existingUser);
        return existingUser;
      }
    }

    throw error;
  }
};


// Middleware to protect routes and ensure the user is authenticated and exists in the database.
export const ProtectRoute = [
  requireAuth(), // Ensure the user is authenticated with Clerk
  
  // Custom middleware to check if the user exists in the database and create them if they don't.
  async (req, res, next) => {
    try {
      const { userId: clerkId } = req.auth();

      if (!clerkId) {
        return res.status(401).json({ message: "Unauthorized, invalid token" });
      }

      let user = await User.findOne({ clerkId });

      if (!user) {
        try {
          user = await createUserFromClerk(clerkId);
        } catch (error) {
          if (error.code === 11000) {
            user = await User.findOne({ clerkId });
          } else {
            throw error;
          }
        }
      }

      if (!user) {
        return res.status(401).json({ message: "Unauthorized, user not found in database" });
      }

      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
];


// Here's how the ProtectRoute middleware works:
//
// 1. requireAuth() checks that the request has a valid Clerk login. If not,
//    it stops the request right there - our own code below never even runs.
//
// 2. We then look up this user in our own database by their Clerk id. Most
//    of the time they're already there, because Inngest created them in the
//    background when they first signed up.
//
// 3. Sometimes a brand new user reaches this before that background step has
//    finished. When that happens, we create their record right here instead
//    of failing, so they're not stuck waiting on it.
//
// 4. If two requests both try to create the same user at once (a race), we
//    don't crash - we just look the user up again, since the other request
//    already created them by then.
//
// 5. Once we have the user, we attach it as req.user so every route after
//    this middleware can use it without looking it up again.
