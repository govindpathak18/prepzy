import {stramChat} from "stream-chat";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY
const apiSecret = ENV.STREAM_API_SECRET

if(!apiKey || !apiSecret){
    console.error("missing stream api key or api secret");
}

export const chatClient = stramChat.getInstance(apiKey,apiSecret);

export const upsertStreamUser = async (userData)=>{ //upser means both create and update the data
    try {
        await chatClient.upsertUsers([userData])
        console.log("stream user upserted successfully", userData);
    } catch (error) {
        console.error("Error upserting stream user:", error);
    }
}

export const deleteStreamUser = async (userId)=>{ //upser means both create and update the data
    try {
        await chatClient.deleteUser(userId)
        console.log("stream user deleted successfully");
        
    } catch (error) {
        console.error("Error deleting stream user:", error);
    }
}

// todo: genereateToken method