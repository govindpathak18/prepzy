import { Code2Icon, LoaderIcon, PlusIcon, XIcon, ChevronDownIcon } from "lucide-react";
import { PROBLEMS } from "../../data/problems";
import { getDifficultyBadgeClass } from "../lib/utils";
import { useState, useRef, useEffect } from "react";

function CreateSessionModal({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) {
  const problems = Object.values(PROBLEMS);
  const selectedProblem = problems.find((p) => p.title === roomConfig.problem);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">

      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-full max-w-lg rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl z-10 animate-fadeUp">

        {/* HEADER */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-100 dark:bg-purple-950">
              <Code2Icon className="size-5 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold">Create New Session</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <XIcon className="size-4" />
          </button>
        </div>

        {/* BODY */}
        <div className="px-6 py-5 space-y-5">

          {/* PROBLEM SELECTION */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Select Problem <span className="text-red-500">*</span>
            </label>

            {/* CUSTOM DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              >
                <span className={roomConfig.problem ? "text-zinc-800 dark:text-zinc-200" : "text-zinc-400"}>
                  {roomConfig.problem || "Choose a coding problem..."}
                </span>
                <ChevronDownIcon
                  className={`size-4 text-zinc-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* DROPDOWN LIST — always opens downward */}
              {dropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden animate-scaleIn">
                  <div className="max-h-52 overflow-y-auto">
                    {problems.map((problem) => (
                      <button
                        key={problem.id}
                        type="button"
                        onClick={() => {
                          setRoomConfig({
                            difficulty: problem.difficulty,
                            problem: problem.title,
                          });
                          setDropdownOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors
                          ${roomConfig.problem === problem.title
                            ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300"
                            : "text-zinc-700 dark:text-zinc-300"
                          }`}
                      >
                        <span>{problem.title}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyBadgeClass(problem.difficulty)}`}>
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ROOM SUMMARY */}
          {selectedProblem && (
            <div className="rounded-xl border border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-950/40 p-4 space-y-3">
              <p className="text-xs font-semibold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                Session Summary
              </p>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Problem</span>
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">{selectedProblem.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Difficulty</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyBadgeClass(selectedProblem.difficulty)}`}>
                    {selectedProblem.difficulty.charAt(0).toUpperCase() + selectedProblem.difficulty.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">Participants</span>
                  <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">2 (1-on-1 session)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end gap-3 px-6 pb-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:border-purple-400 hover:text-purple-600 transition-all duration-200"
          >
            Cancel
          </button>
          <button
            onClick={onCreateRoom}
            disabled={isCreating || !roomConfig.problem}
            className="flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-95"
            style={{
              background: isCreating || !roomConfig.problem
                ? "#9B7FF5"
                : "linear-gradient(135deg, #7C5EF0 0%, #9B7FF5 100%)",
              boxShadow: isCreating || !roomConfig.problem
                ? "none"
                : "0 2px 12px rgba(124,94,240,0.4)",
            }}
          >
            {isCreating ? (
              <LoaderIcon className="size-4 animate-spin" />
            ) : (
              <PlusIcon className="size-4" />
            )}
            {isCreating ? "Creating..." : "Create Session"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateSessionModal;