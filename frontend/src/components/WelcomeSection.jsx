import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

function WelcomeSection({ onCreateSession }) {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
                <SparklesIcon className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-5xl font-black bg-gradient-to-r from-purple-500 via-violet-500 to-purple-400 bg-clip-text text-transparent">
                Welcome back, {user?.firstName || "there"}!
              </h1>
            </div>
            <p className="text-xl text-zinc-400 ml-16">
              Ready to level up your coding skills?
            </p>
          </div>

          <button
            onClick={onCreateSession}
            className="group flex items-center gap-3 px-8 py-4 rounded-2xl text-white font-bold text-lg transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
            style={{
              background: "linear-gradient(135deg, #7C5EF0 0%, #9B7FF5 100%)",
              boxShadow: "0 4px 20px rgba(124,94,240,0.45)",
            }}
          >
            <ZapIcon className="w-6 h-6" />
            <span>Create Session</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;