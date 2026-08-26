import { chatClient } from "../lib/stream.js";

// Get Stream token for authenticated user (for both chat and video)
export async function getStreamToken(req, res) {
    try {
        // use clerkId from req.user to create stream token, not mongoDb
        //it should match the id we have in stream dashboard for users
        const token = chatClient.createToken(req.user.clerkId);

        res.status(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.profileImage,
        })
    } catch (error) {
        console.error("Error creating Stream token:", error);
        res.status(500).json({ message: "Failed to create Stream token" });
    }
}

