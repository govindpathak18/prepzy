import { Link } from "react-router";
import {
  ArrowRightIcon,
  CheckIcon,
  Code2Icon,
  SparklesIcon,
  UsersIcon,
  VideoIcon,
  ZapIcon,
} from "lucide-react";
import { SignedOut, SignInButton } from "@clerk/clerk-react";

function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">

      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-200">
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

          <SignedOut>
            <SignInButton mode="modal">
              <button
                className="group flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                style={{
                  background: "linear-gradient(135deg, #7C5EF0 0%, #9B7FF5 100%)",
                  boxShadow: "0 2px 12px rgba(124,94,240,0.4)",
                }}
              >
                Get Started
                <ArrowRightIcon className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </SignInButton>
          </SignedOut>
        </div>
      </nav>

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* LEFT */}
          <div className="space-y-8 animate-fadeUp">

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800">
              <ZapIcon className="size-3.5" />
              Real-time Collaboration
            </div>

            {/* HEADING */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              <span className="bg-gradient-to-r from-purple-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
                Code Together,
              </span>
              <br />
              <span className="text-zinc-900 dark:text-zinc-100">Learn Together</span>
            </h1>

            <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-xl">
              The ultimate platform for collaborative coding interviews and pair programming.
              Connect face-to-face, code in real-time, and ace your technical interviews.
            </p>

            {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-2">
              {["Live Video Chat", "Code Editor", "Multi-Language"].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 text-zinc-600 dark:text-zinc-400"
                >
                  <CheckIcon className="size-3.5 text-green-500" />
                  {feature}
                </div>
              ))}
            </div>

            {/* CTA BUTTONS */}
            <div className="flex flex-wrap gap-3">
              <SignedOut>
                <SignInButton mode="modal">
                  <button
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-white transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                    style={{
                      background: "linear-gradient(135deg, #7C5EF0 0%, #9B7FF5 100%)",
                      boxShadow: "0 2px 16px rgba(124,94,240,0.45)",
                    }}
                  >
                    Start Coding Now
                    <ArrowRightIcon className="size-4" />
                  </button>
                </SignInButton>
              </SignedOut>

              <Link
                to="#"
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:border-purple-400 hover:text-purple-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                <VideoIcon className="size-4" />
                Watch Demo
              </Link>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "500+", label: "Active Users", color: "text-purple-600 dark:text-purple-400" },
                { value: "1K+", label: "Sessions", color: "text-purple-600 dark:text-purple-400" },
                { value: "99.9%", label: "Uptime", color: "text-purple-600 dark:text-purple-400" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 text-center"
                >
                  <div className={`text-2xl font-black ${stat.color} mb-1`}>{stat.value}</div>
                  <div className="text-xs text-zinc-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="animate-fadeUp" style={{ animationDelay: "100ms" }}>
            <img
              src="/hero.png"
              alt="Prepzy Platform"
              className="w-full h-auto rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-12 animate-fadeUp">
          <h2 className="text-4xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-purple-500 to-violet-500 bg-clip-text text-transparent font-mono">
              Succeed
            </span>
          </h2>
          <p className="text-base text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
            Powerful features designed to make your coding interviews seamless and productive
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: VideoIcon,
              title: "HD Video Call",
              desc: "Crystal clear video and audio for seamless communication during interviews",
              delay: "0ms",
            },
            {
              icon: Code2Icon,
              title: "Live Code Editor",
              desc: "Collaborate in real-time with syntax highlighting and multiple language support",
              delay: "50ms",
            },
            {
              icon: UsersIcon,
              title: "Easy Collaboration",
              desc: "Share your screen, discuss solutions, and learn from each other in real-time",
              delay: "100ms",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 hover:border-purple-400/50 hover:-translate-y-1 transition-all duration-200 animate-fadeUp text-center"
              style={{ animationDelay: feature.delay }}
            >
              <div className="size-14 bg-purple-100 dark:bg-purple-950 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="size-7 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default HomePage;