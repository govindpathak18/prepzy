import { chatClient } from "../lib/stream.js";

export async function getStreamToken(req, res) {
    try {
        // use clerkId from req.user to create stream token, not mongoDb it
        //it should match the id we have in stream dashboard for users
        const token = chatClient.createToken(req.user.clerkId);

        res.staus(200).json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.image,
        })
    } catch (error) {
        console.error("Error creating Stream token:", error);
        res.status(500).json({ error: "Failed to create Stream token" });
    }
}