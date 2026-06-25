import { useAuth } from "@clerk/clerk-react";
import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initializeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/sessions";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const { getToken } = useAuth();
  const sessionCallId = session?.callId;
  const sessionStatus = session?.status;
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  useEffect(() => {
    let videoCall = null;
    let chatClientInstance = null;

    const initCall = async () => {
      if (!sessionCallId) return;
      if (!isHost && !isParticipant) return;
      if (sessionStatus === "completed") return;

      const apiKey = import.meta.env.VITE_STREAM_API_KEY;

      // ✅ Validate API key before proceeding
      if (!apiKey) {
        toast.error("Stream API key is missing");
        setIsInitializingCall(false);
        return;
      }

      try {
        const authToken = await getToken();
        const { token, userId, userName, userImage } = await sessionApi.getStreamToken(authToken);

        const client = await initializeStreamClient(
          { id: userId, name: userName, image: userImage },
          token
        );

        setStreamClient(client);

        videoCall = client.call("default", sessionCallId);
        await videoCall.join({ create: true });
        setCall(videoCall);

        // ✅ Reuse existing instance if already connected
        chatClientInstance = StreamChat.getInstance(apiKey);

        await chatClientInstance.connectUser(
          { id: userId, name: userName, image: userImage },
          token
        );
        setChatClient(chatClientInstance);

        const chatChannel = chatClientInstance.channel("messaging", sessionCallId);
        await chatChannel.watch();
        setChannel(chatChannel);
      } catch (error) {
        toast.error("Failed to join video call");
        console.error("Error initializing call:", error);
      } finally {
        setIsInitializingCall(false);
      }
    };

    if (sessionCallId && !loadingSession) initCall();

    // cleanup
    return () => {
      (async () => {
        try {
          if (videoCall) await videoCall.leave();
          if (chatClientInstance) await chatClientInstance.disconnectUser();
          await disconnectStreamClient();
        } catch (error) {
          console.error("Cleanup error:", error);
        }
      })();
    };

  // ✅ Use primitives instead of object reference to avoid infinite re-renders
  }, [sessionCallId, sessionStatus, loadingSession, isHost, isParticipant, getToken]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
