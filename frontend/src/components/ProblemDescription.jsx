import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

function ProblemDescription({ problem, currentProblemId, onProblemChange, allProblems }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentProblem = allProblems.find((p) => p.id === currentProblemId);

  return (
    <div className="h-full overflow-y-auto bg-zinc-50 dark:bg-zinc-900 flex flex-col">

      {/* HEADER */}
      <div className="px-6 pt-6 pb-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h1 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 leading-tight">
            {problem.title}
          </h1>
          <span className={`text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${getDifficultyBadgeClass(problem.difficulty)}`}>
            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
          </span>
        </div>

        <p className="text-xs text-zinc-400 uppercase tracking-wider font-medium">
          {problem.category}
        </p>

        {/* PROBLEM SELECTOR */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setDropdownOpen((o) => !o)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 hover:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
          >
            <span className="text-zinc-700 dark:text-zinc-300 truncate">
              {currentProblem ? `${currentProblem.title}` : "Select problem..."}
            </span>
            <ChevronDownIcon
              className={`size-4 text-zinc-400 flex-shrink-0 ml-2 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1.5 z-50 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 shadow-xl overflow-hidden animate-scaleIn">
              <div className="max-h-52 overflow-y-auto">
                {allProblems.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onProblemChange(p.id);
                      setDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-colors
                      ${currentProblemId === p.id
                        ? "bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300"
                        : "text-zinc-700 dark:text-zinc-300"
                      }`}
                  >
                    <span className="truncate">{p.title}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ml-2 ${getDifficultyBadgeClass(p.difficulty)}`}>
                      {p.difficulty.charAt(0).toUpperCase() + p.difficulty.slice(1)}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-5 space-y-4 flex-1">

        {/* DESCRIPTION */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Description
          </h2>
          <div className="space-y-2 text-sm leading-relaxed">
            <p className="text-zinc-700 dark:text-zinc-300">{problem.description.text}</p>
            {problem.description.notes.map((note, idx) => (
              <p key={idx} className="text-zinc-500 dark:text-zinc-400">{note}</p>
            ))}
          </div>
        </div>

        {/* EXAMPLES */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-4">
            Examples
          </h2>
          <div className="space-y-4">
            {problem.examples.map((example, idx) => (
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

        {/* CONSTRAINTS */}
        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5">
          <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Constraints
          </h2>
          <ul className="space-y-2">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-purple-500 mt-0.5">•</span>
                <code className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {constraint}
                </code>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default ProblemDescription;