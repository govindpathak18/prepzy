import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";
import { deleteStreamUser, upsertStreamUser } from "./stream.js";
import { getPrimaryEmail, getDisplayName, getProfileImage } from "./clerkUser.js";

export const inngest = new Inngest({ id: "talent-iq" });

// Inngest functions -> these are the serverless functions that run in response to events
const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" },
  async ({ event, step }) => {
    await connectDB();

    const { id } = event.data;

    // Same fallback-aware helpers protectRoutes.js uses, so a Clerk user
    // with a missing/unusual email or name is handled the same way no
    // matter which of the two paths creates their record first.
    const newUser = {
      clerkId: id,
      email: getPrimaryEmail(event.data, id),
      name: getDisplayName(event.data),
      profileImage: getProfileImage(event.data),
    };

    // "Update or create" instead of a plain create. If Inngest retries this
    // function (say the Stream step below fails), running create() again
    // would crash because the user already exists. This way, running it
    // again just updates the same user instead of crashing.
    await User.findOneAndUpdate({ clerkId: id }, newUser, {
      upsert: true,
      new: true,
      setDefaultsOnInsert: true,
      // Keep validating the data here too (e.g. email can't be empty) -
      // this is off by default for updates, unlike create().
      runValidators: true,
    });

    // Safe to run again too - Stream just updates the user if they already exist.
    await upsertStreamUser({
      id: newUser.clerkId.toString(),
      name: newUser.name,
      image: newUser.profileImage,
    });

    await step.sendEvent("user-onboarding-started", {
      name: "app/user.onboarding.started",
      data: {
        clerkId: newUser.clerkId,
        email: newUser.email,
        name: newUser.name,
      },
    });
  }
);

// delete a user from the database and Stream when they are deleted in Clerk
const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();

    const { id } = event.data;
    // Safe to run again too - deleting something that's already gone
    // doesn't cause an error, it just does nothing.
    await User.deleteOne({ clerkId: id });

    await deleteStreamUser(id.toString());
    
  }
);

export const functions = [syncUser, deleteUserFromDB];


// Here's how Inngest works in this project:
//
// 1. Clerk sends a webhook whenever a user signs up or gets deleted. That
//    webhook goes to Inngest (through the /api/inngest route in server.js),
//    and Inngest turns it into an event like "clerk/user.created".
//
// 2. The two functions above are just "when this event happens, run this
//    code" rules. createFunction() connects an event name to the code that
//    should run when it fires.
//
// 3. If the code inside a function throws an error, Inngest doesn't give up
//    - it automatically tries again later. That's why both functions are
//    written so it's safe to run them twice (update-or-create instead of
//    create, and a delete that doesn't error if the user is already gone).
//
// 4. None of this runs on its own - the `functions` array right above is
//    what server.js hands to Inngest, so it knows these two functions exist
//    and which events should trigger them.
