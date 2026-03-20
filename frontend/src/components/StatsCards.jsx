import { TrophyIcon, UsersIcon } from "lucide-react";

function StatsCards({ activeSessionsCount, recentSessionsCount }) {
  return (
    <div className="lg:col-span-1 grid grid-cols-1 gap-4">

      {/* ACTIVE SESSIONS */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-purple-400/50 transition-all duration-200 hover:-translate-y-0.5 animate-fadeUp">
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950">
            <UsersIcon className="size-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800">
            <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </div>
        </div>
        <div className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1 tracking-tight">
          {activeSessionsCount}
        </div>
        <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
          Active Sessions
        </div>
      </div>

      {/* TOTAL SESSIONS */}
      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 hover:border-purple-400/50 transition-all duration-200 hover:-translate-y-0.5 animate-fadeUp" style={{ animationDelay: "50ms" }}>
        <div className="flex items-center justify-between mb-4">
          <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950">
            <TrophyIcon className="size-5 text-purple-600 dark:text-purple-400" />
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
            Total
          </div>
        </div>
        <div className="text-4xl font-semibold text-zinc-900 dark:text-zinc-100 mb-1 tracking-tight">
          {recentSessionsCount}
        </div>
        <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
          Past Sessions
        </div>
      </div>

    </div>
  );
}

export default StatsCards;