import { CheckCircleIcon, XCircleIcon, TerminalIcon, ClockIcon } from "lucide-react";

function OutputPanel({ output, remoteRun }) {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">

      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-700">
        <div className="flex items-center gap-2">
          <TerminalIcon className="size-4 text-purple-400" />
          <span className="text-xs font-medium text-zinc-300">Output</span>
        </div>

        {/* STATUS BADGE */}
        {output !== null && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium
            ${output.success
              ? "bg-green-950 text-green-400 border border-green-800"
              : "bg-red-950 text-red-400 border border-red-800"
            }`}
          >
            {output.success
              ? <><CheckCircleIcon className="size-3" /> Passed</>
              : <><XCircleIcon className="size-3" /> Failed</>
            }
          </div>
        )}
      </div>

      {/* BODY */}
      <div className="flex-1 overflow-auto p-4 bg-zinc-950 font-mono text-sm">
        {remoteRun && (
          <div className="mb-4 p-3 border border-zinc-800 rounded-lg bg-zinc-900">
            <div className="flex items-center justify-between mb-2">
              <div className="text-xs text-zinc-400">Remote run by <span className="font-medium text-zinc-200">{remoteRun.user}</span></div>
              <div className="text-xs text-zinc-400">{remoteRun.language}</div>
            </div>
            <div className="text-sm text-zinc-300 whitespace-pre-wrap">{remoteRun.code}</div>
            <div className="pt-3 text-xs text-zinc-500 border-t border-zinc-800">
              {remoteRun.success ? "Passed" : "Failed"} • Executed in {remoteRun.executionTime ?? "?"}s
            </div>
          </div>
        )}
        {output === null ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <TerminalIcon className="size-8 text-zinc-700" />
            <p className="text-zinc-500 text-xs">
              Click "Run Code" to see output here...
            </p>
          </div>
        ) : output.success ? (
          <div className="space-y-3">
            <pre className="text-green-400 whitespace-pre-wrap leading-relaxed">
              {output.output}
            </pre>
            {output.executionTime && (
              <div className="flex items-center gap-1.5 pt-3 border-t border-zinc-800">
                <ClockIcon className="size-3 text-zinc-500" />
                <span className="text-xs text-zinc-500">
                  Executed in {output.executionTime}s
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {output.output && (
              <pre className="text-zinc-300 whitespace-pre-wrap leading-relaxed">
                {output.output}
              </pre>
            )}
            <pre className="text-red-400 whitespace-pre-wrap leading-relaxed">
              {output.error}
            </pre>
            {output.executionTime && (
              <div className="flex items-center gap-1.5 pt-3 border-t border-zinc-800">
                <ClockIcon className="size-3 text-zinc-500" />
                <span className="text-xs text-zinc-500">
                  Executed in {output.executionTime}s
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default OutputPanel;