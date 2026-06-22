import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { getDifficultyBadgeClass } from "../lib/utils";

function ActiveSessions({ sessions, isLoading, isUserInSession }) {
  return (
    <div className="lg:col-span-2 h-full rounded-2xl border border-purple-500/20 bg-white dark:bg-zinc-900 hover:border-purple-500/40 transition-colors duration-300 shadow-sm">
      <div className="p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950">
              <ZapIcon className="size-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h2 className="text-xl font-semibold tracking-tight">Live Sessions</h2>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800">
            <span className="size-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-green-700 dark:text-green-400">
              {sessions.length} active
            </span>
          </div>
        </div>

        {/* SESSIONS LIST */}
        <div className="space-y-3 max-h-[420px] overflow-y-auto pr-1">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="size-8 animate-spin text-purple-500" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session, i) => (
              <div
                key={session._id}
                className="group rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 hover:border-purple-400/50 hover:bg-purple-50/30 dark:hover:bg-purple-950/20 transition-all duration-200"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-center justify-between gap-4 p-4">

                  {/* LEFT */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="relative size-12 rounded-xl bg-purple-100 dark:bg-purple-950 flex items-center justify-center flex-shrink-0">
                      <Code2Icon className="size-6 text-purple-600 dark:text-purple-400" />
                      <span className="absolute -top-1 -right-1 size-3.5 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5">
                        <h3 className="font-semibold text-sm truncate">{session.problem}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyBadgeClass(session.difficulty)}`}>
                          {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                        <div className="flex items-center gap-1">
                          <CrownIcon className="size-3 text-purple-400" />
                          <span>{session.host?.name}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <UsersIcon className="size-3" />
                          <span>{session.participant ? "2/2" : "1/2"}</span>
                        </div>
                        {session.participant && !isUserInSession(session) ? (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-600 dark:bg-red-950 dark:text-red-400">
                            Full
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
                            Open
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* RIGHT — BUTTON */}
                  {session.participant && !isUserInSession(session) ? (
                    <button
                      disabled
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-700 text-zinc-400 cursor-not-allowed"
                    >
                      Full
                    </button>
                  ) : (
                    <Link
                      to={`/session/${session._id}`}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                      style={{
                        background: "linear-gradient(135deg, #7C5EF0 0%, #9B7FF5 100%)",
                        boxShadow: "0 2px 12px rgba(124,94,240,0.35)",
                      }}
                    >
                      {isUserInSession(session) ? "Rejoin" : "Join"}
                      <ArrowRightIcon className="size-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                <SparklesIcon className="size-8 text-purple-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                No active sessions
              </p>
              <p className="text-xs text-zinc-400">Be the first to create one!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActiveSessions;