import { clerkClient, requireAuth } from "@clerk/express";
import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";

const DEFAULT_EDITOR_PREFERENCES = {
  defaultLanguage: "cpp",
  theme: "vs-dark",
};

const getPrimaryEmail = (clerkUser, clerkId) =>
  clerkUser.emailAddresses?.[0]?.emailAddress ||
  clerkUser.primaryEmailAddress?.emailAddress ||
  clerkUser.email_addresses?.[0]?.email_address ||
  clerkUser.email ||
  `${clerkId}@clerk.prepzy.local`;

const getDisplayName = (clerkUser) =>
  `${clerkUser.firstName || clerkUser.first_name || ""} ${
    clerkUser.lastName || clerkUser.last_name || ""
  }`.trim() ||
  clerkUser.username ||
  clerkUser.externalId ||
  "Prepzy User";

const syncStreamUser = async (user) => {
  await upsertStreamUser({
    id: user.clerkId.toString(),
    name: user.name,
    image: user.profileImage,
  });
};

const createUserFromClerk = async (clerkId) => {
  const clerkUser = await clerkClient.users.getUser(clerkId);

  const email = getPrimaryEmail(clerkUser, clerkId);
  const name = getDisplayName(clerkUser);
  const profileImage =
    clerkUser.profileImageUrl || clerkUser.imageUrl || clerkUser.image_url || "";

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

export const ProtectRoute = [
  requireAuth(),
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
