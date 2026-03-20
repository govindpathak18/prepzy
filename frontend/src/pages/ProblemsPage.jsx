import { Link } from "react-router";
import Navbar from "../components/Navbar";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { PROBLEMS } from "../../data/problems";

function ProblemsPage() {
  const problems = Object.values(PROBLEMS);

  const easyCount = problems.filter((p) => p.difficulty.toLowerCase() === "easy").length;
  const mediumCount = problems.filter((p) => p.difficulty.toLowerCase() === "medium").length;
  const hardCount = problems.filter((p) => p.difficulty.toLowerCase() === "hard").length;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-12">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-zinc-900 dark:text-zinc-100">
            Practice Problems
          </h1>
          <p className="text-zinc-400">
            Sharpen your coding skills with these curated problems
          </p>
        </div>

        {/* PROBLEMS LIST */}
        <div className="space-y-4">
          {problems.map((problem) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="block rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:border-purple-400/50 hover:scale-[1.01] transition-all duration-200"
            >
              <div className="card-body">
                <div className="flex items-center justify-between gap-4">
                  {/* LEFT SIDE */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="size-12 rounded-lg bg-purple-100 dark:bg-purple-950 flex items-center justify-center">
                        <Code2Icon className="size-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold text-zinc-900 dark:text-zinc-100">
                            {problem.title}
                          </h2>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getDifficultyBadgeClass(problem.difficulty)}`}>
                            {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-400">{problem.category}</p>
                      </div>
                    </div>
                    <p className="text-zinc-500 dark:text-zinc-400 mb-3">
                      {problem.description.text}
                    </p>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400">
                    <span className="font-medium">Solve</span>
                    <ChevronRightIcon className="size-5" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* STATS FOOTER */}
        <div className="mt-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
          <div className="card-body">
            <div className="stats stats-vertical lg:stats-horizontal w-full">
              <div className="stat">
                <div className="stat-title text-zinc-400">Total Problems</div>
                <div className="stat-value text-purple-600 dark:text-purple-400">{problems.length}</div>
              </div>
              <div className="stat">
                <div className="stat-title text-zinc-400">Easy</div>
                <div className="stat-value text-green-600 dark:text-green-400">{easyCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title text-zinc-400">Medium</div>
                <div className="stat-value text-yellow-600 dark:text-yellow-400">{mediumCount}</div>
              </div>
              <div className="stat">
                <div className="stat-title text-zinc-400">Hard</div>
                <div className="stat-value text-red-600 dark:text-red-400">{hardCount}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default ProblemsPage;