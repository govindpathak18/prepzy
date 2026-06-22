import { Link, useLocation } from "react-router-dom";
import { BookOpenIcon, LayoutDashboardIcon, SparklesIcon } from "lucide-react";
import { UserButton } from "@clerk/clerk-react";

function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-3 hover:scale-105 transition-transform duration-200"
        >
          <div className="size-9 rounded-xl bg-purple-600 flex items-center justify-center shadow-md shadow-purple-500/30">
            <SparklesIcon className="size-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="font-semibold text-lg tracking-tight animate-shimmer font-mono">
              Prepzy
            </span>
            <span className="text-xs text-zinc-400 -mt-0.5">Code Together</span>
          </div>
        </Link>

        {/* NAV LINKS + USER */}
        <div className="flex items-center gap-1">

          {/* PROBLEMS */}
          <Link
            to="/problems"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive("/problems")
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
          >
            <BookOpenIcon className="size-4" />
            <span className="hidden sm:inline">Problems</span>
          </Link>

          {/* DASHBOARD */}
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${isActive("/dashboard")
                ? "bg-purple-600 text-white shadow-md shadow-purple-500/30"
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
          >
            <LayoutDashboardIcon className="size-4" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          {/* USER BUTTON */}
          <div className="ml-3">
            <UserButton />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;