import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const ProtectRoute = [
    requireAuth(), // check if user is authenticated using Clerk, adds auth() method to req object
    async (req, res, next) => {
        try {
            const { userId: clerkId } = req.auth();
            if (!clerkId) return res.status(401).json({ message: "Unauthorized, invalid token" });

            //find user in db
            const user = await User.findOne({ clerkId });
            if (!user) return res.status(401).json({ message: "Unauthorized, user not found" });

            req.user = user; // add user to request object

            next();
        } catch (error) {
            console.error("error in protectRoute middleware", error);

            return res.status(500).json({ message: "Internal server error" });
        }
    }
]

//when we pass an array of middlewares to Express, it automatically flattens and exectues
// them sequentially, one by one