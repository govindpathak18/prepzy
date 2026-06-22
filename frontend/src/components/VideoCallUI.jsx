import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Channel, Chat, MessageInput, MessageList, Thread, Window } from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({ chatClient, channel }) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // JOINING STATE
  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-950">
        <div className="text-center space-y-4">
          <div className="size-16 mx-auto rounded-2xl bg-purple-950 flex items-center justify-center">
            <Loader2Icon className="size-8 animate-spin text-purple-400" />
          </div>
          <p className="text-sm font-medium text-zinc-400">Joining call...</p>
        </div>
      </div>
    );
  }

  // CALL ENDED / OFFLINE STATE
  if (
    callingState === CallingState.LEFT ||
    callingState === CallingState.IDLE
  ) {
    return (
      <div className="h-full flex items-center justify-center bg-zinc-950">
        <div className="text-center space-y-4">
          <div className="size-16 mx-auto rounded-2xl bg-red-950 flex items-center justify-center">
            <XIcon className="size-8 text-red-400" />
          </div>
          <p className="text-sm font-medium text-zinc-400">Call ended</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 mx-auto px-5 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7C5EF0 0%, #9B7FF5 100%)",
              boxShadow: "0 2px 12px rgba(124,94,240,0.4)",
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex gap-3 relative str-video">

      {/* MAIN VIDEO AREA */}
      <div className="flex-1 flex flex-col gap-3 min-w-0">

        {/* TOP BAR */}
        <div className="flex items-center justify-between gap-2 bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-green-500 animate-pulse" />
            <UsersIcon className="size-4 text-zinc-400" />
            <span className="text-sm font-medium text-zinc-300">
              {participantCount} {participantCount === 1 ? "participant" : "participants"}
            </span>
          </div>

          {chatClient && channel && (
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200
                ${isChatOpen
                  ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 border border-zinc-700"
                }`}
            >
              <MessageSquareIcon className="size-3.5" />
              Chat
            </button>
          )}
        </div>

        {/* VIDEO */}
        <div className="flex-1 bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800">
          <SpeakerLayout />
        </div>

        {/* CALL CONTROLS */}
        <div className="bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-xl flex justify-center">
          <CallControls onLeave={() => navigate("/dashboard")} />
        </div>
      </div>

      {/* CHAT PANEL */}
      {chatClient && channel && (
        <div
          className={`flex flex-col rounded-xl overflow-hidden border border-zinc-800 bg-zinc-900 transition-all duration-300 ease-in-out flex-shrink-0
            ${isChatOpen ? "w-80 opacity-100" : "w-0 opacity-0 border-0"}`}
        >
          {isChatOpen && (
            <>
              {/* CHAT HEADER */}
              <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900">
                <div className="flex items-center gap-2">
                  <MessageSquareIcon className="size-4 text-purple-400" />
                  <h3 className="text-sm font-semibold text-zinc-200">Session Chat</h3>
                </div>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1 rounded-lg text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
                >
                  <XIcon className="size-4" />
                </button>
              </div>

              {/* CHAT BODY */}
              <div className="flex-1 overflow-hidden">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default VideoCallUI;