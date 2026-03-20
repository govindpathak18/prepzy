import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

function RecentSessions({ sessions, isLoading }) {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm mt-8">
      <div className="p-6">

        {/* HEADER */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950">
            <Clock className="size-5 text-purple-600 dark:text-purple-400" />
          </div>
          <h2 className="text-xl font-semibold tracking-tight">Your Past Sessions</h2>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {isLoading ? (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader className="size-8 animate-spin text-purple-500" />
            </div>
          ) : sessions.length > 0 ? (
            sessions.map((session, i) => (
              <div
                key={session._id}
                className={`relative rounded-xl border p-5 transition-all duration-200 animate-fadeUp
                  ${session.status === "active"
                    ? "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/20 hover:border-green-400"
                    : "border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 hover:border-purple-400/50"
                  }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* ACTIVE BADGE */}
                {session.status === "active" && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
                    <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                    Active
                  </div>
                )}

                {/* TOP ROW */}
                <div className="flex items-start gap-3 mb-4">
                  <div className={`size-11 rounded-xl flex items-center justify-center flex-shrink-0
                    ${session.status === "active"
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-purple-100 dark:bg-purple-950"
                    }`}
                  >
                    <Code2 className={`size-5 ${session.status === "active" ? "text-green-600 dark:text-green-400" : "text-purple-600 dark:text-purple-400"}`} />
                  </div>
                  <div className="flex-1 min-w-0 pr-12">
                    <h3 className="font-semibold text-sm text-zinc-900 dark:text-zinc-100 truncate mb-1.5">
                      {session.problem}
                    </h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyBadgeClass(session.difficulty)}`}>
                      {session.difficulty.charAt(0).toUpperCase() + session.difficulty.slice(1)}
                    </span>
                  </div>
                </div>

                {/* META */}
                <div className="space-y-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <Clock className="size-3" />
                    <span>
                      {formatDistanceToNow(new Date(session.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <Users className="size-3" />
                    <span>
                      {session.participant ? "2 participants" : "1 participant"}
                    </span>
                  </div>
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-zinc-700">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full
                    ${session.status === "active"
                      ? "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                    }`}
                  >
                    {session.status === "active" ? "In Progress" : "Completed"}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {new Date(session.updatedAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="size-16 mx-auto mb-4 rounded-2xl bg-purple-50 dark:bg-purple-950 flex items-center justify-center">
                <Trophy className="size-8 text-purple-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-600 dark:text-zinc-400 mb-1">
                No sessions yet
              </p>
              <p className="text-xs text-zinc-400">Start your coding journey today!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default RecentSessions;