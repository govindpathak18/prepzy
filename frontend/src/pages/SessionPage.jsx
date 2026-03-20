import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useEndSession, useJoinSession, useSessionById } from "../hooks/useSessions";
import { PROBLEMS } from "../../data/problems";
import { executeCode } from "../lib/judge0";
import Navbar from "../components/Navbar";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";

import useStreamClient from "../hooks/useStreamClient";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const { data: sessionData, isLoading: loadingSession, refetch } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } = useStreamClient(
    session,
    loadingSession,
    isHost,
    isParticipant
  );

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState(problemData?.starterCode?.[selectedLanguage] || "");

  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [session, user, loadingSession, isHost, isParticipant, id]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      endSessionMutation.mutate(id, { onSuccess: () => navigate("/dashboard") });
    }
  };

  return (
    <div className="h-screen bg-zinc-950 flex flex-col">
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">

          {/* LEFT PANEL */}
          <Panel defaultSize={50} minSize={30}>
            <PanelGroup direction="vertical">

              {/* PROBLEM DESCRIPTION */}
              <Panel defaultSize={50} minSize={20}>
                <div className="h-full overflow-y-auto bg-zinc-50 dark:bg-zinc-900">

                  {/* HEADER */}
                  <div className="p-6 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
                          {session?.problem || "Loading..."}
                        </h1>
                        {problemData?.category && (
                          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-wider">
                            {problemData.category}
                          </p>
                        )}
                        <p className="text-sm text-zinc-400 mt-2">
                          Host: {session?.host?.name || "Loading..."} •{" "}
                          {session?.participant ? 2 : 1}/2 participants
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        {session?.difficulty && (
                          <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${getDifficultyBadgeClass(session.difficulty)}`}>
                            {session.difficulty?.charAt(0).toUpperCase() + session.difficulty?.slice(1)}
                          </span>
                        )}

                        {isHost && session?.status === "active" && (
                          <button
                            onClick={handleEndSession}
                            disabled={endSessionMutation.isPending}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 disabled:opacity-50 hover:-translate-y-0.5 active:scale-95"
                            style={{
                              background: "linear-gradient(135deg, #E24B4A 0%, #f07878 100%)",
                              boxShadow: "0 2px 10px rgba(226,75,74,0.3)",
                            }}
                          >
                            {endSessionMutation.isPending ? (
                              <Loader2Icon className="size-3.5 animate-spin" />
                            ) : (
                              <LogOutIcon className="size-3.5" />
                            )}
                            End Session
                          </button>
                        )}

                        {session?.status === "completed" && (
                          <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                            Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* BODY */}
                  <div className="p-6 space-y-4">

                    {/* DESCRIPTION */}
                    {problemData?.description && (
                      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                          Description
                        </h2>
                        <div className="space-y-2 text-sm leading-relaxed">
                          <p className="text-zinc-700 dark:text-zinc-300">
                            {problemData.description.text}
                          </p>
                          {problemData.description.notes?.map((note, idx) => (
                            <p key={idx} className="text-zinc-500 dark:text-zinc-400">{note}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* EXAMPLES */}
                    {problemData?.examples?.length > 0 && (
                      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
                          Examples
                        </h2>
                        <div className="space-y-4">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx}>
                              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 mb-2">
                                Example {idx + 1}
                              </p>
                              <div className="rounded-lg bg-zinc-950 p-4 font-mono text-xs space-y-1.5 border border-zinc-800">
                                <div className="flex gap-2">
                                  <span className="text-purple-400 font-bold min-w-[70px]">Input:</span>
                                  <span className="text-zinc-300">{example.input}</span>
                                </div>
                                <div className="flex gap-2">
                                  <span className="text-green-400 font-bold min-w-[70px]">Output:</span>
                                  <span className="text-zinc-300">{example.output}</span>
                                </div>
                                {example.explanation && (
                                  <div className="pt-2 border-t border-zinc-800 mt-1">
                                    <span className="text-zinc-500 font-sans text-xs">
                                      <span className="text-zinc-400 font-semibold">Explanation: </span>
                                      {example.explanation}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* CONSTRAINTS */}
                    {problemData?.constraints?.length > 0 && (
                      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
                        <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
                          Constraints
                        </h2>
                        <ul className="space-y-2">
                          {problemData.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-purple-500 mt-0.5">•</span>
                              <code className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                {constraint}
                              </code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1.5 bg-zinc-800 hover:bg-purple-600 transition-colors duration-150 cursor-row-resize" />

              {/* CODE EDITOR + OUTPUT */}
              <Panel defaultSize={50} minSize={20}>
                <PanelGroup direction="vertical">
                  <Panel defaultSize={70} minSize={30}>
                    <CodeEditorPanel
                      selectedLanguage={selectedLanguage}
                      code={code}
                      isRunning={isRunning}
                      onLanguageChange={handleLanguageChange}
                      onCodeChange={(value) => setCode(value)}
                      onRunCode={handleRunCode}
                    />
                  </Panel>
                  <PanelResizeHandle className="h-1.5 bg-zinc-800 hover:bg-purple-600 transition-colors duration-150 cursor-row-resize" />
                  <Panel defaultSize={30} minSize={15}>
                    <OutputPanel output={output} />
                  </Panel>
                </PanelGroup>
              </Panel>

            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-zinc-800 hover:bg-purple-600 transition-colors duration-150 cursor-col-resize" />

          {/* RIGHT PANEL - VIDEO */}
          <Panel defaultSize={50} minSize={30}>
            <div className="h-full bg-zinc-950 p-4 overflow-auto">
              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="size-16 mx-auto rounded-2xl bg-purple-950 flex items-center justify-center">
                      <Loader2Icon className="size-8 animate-spin text-purple-400" />
                    </div>
                    <p className="text-sm font-medium text-zinc-400">
                      Connecting to video call...
                    </p>
                  </div>
                </div>
              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-8 max-w-sm text-center">
                    <div className="size-16 mx-auto rounded-2xl bg-red-950 flex items-center justify-center mb-4">
                      <PhoneOffIcon className="size-8 text-red-400" />
                    </div>
                    <h2 className="text-lg font-semibold text-zinc-100 mb-2">
                      Connection Failed
                    </h2>
                    <p className="text-sm text-zinc-400">
                      Unable to connect to the video call
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;