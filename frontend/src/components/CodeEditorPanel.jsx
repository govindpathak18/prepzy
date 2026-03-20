import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon, ChevronDownIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../../data/problems";

function CodeEditorPanel({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  return (
    <div className="h-full flex flex-col rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800">
      
      {/* TOOLBAR */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-700">
        
        {/* LANGUAGE SELECTOR */}
        <div className="flex items-center gap-2.5">
          <img
            src={LANGUAGE_CONFIG[selectedLanguage].icon}
            alt={LANGUAGE_CONFIG[selectedLanguage].name}
            className="size-5 rounded"
          />
          <div className="relative">
            <select
              value={selectedLanguage}
              onChange={onLanguageChange}
              className="appearance-none bg-zinc-800 text-zinc-200 text-xs font-medium px-3 py-1.5 pr-7 rounded-lg border border-zinc-700 hover:border-purple-500/50 focus:border-purple-500 focus:outline-none transition-colors cursor-pointer"
            >
              {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
                <option key={key} value={key}>
                  {lang.name}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="absolute right-2 top-1/2 -translate-y-1/2 size-3 text-zinc-400 pointer-events-none" />
          </div>
        </div>

        {/* RUN BUTTON */}
        <button
          onClick={onRunCode}
          disabled={isRunning}
          className="flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-medium text-white transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 active:scale-95"
          style={{
            background: isRunning
              ? "#52489C"
              : "linear-gradient(135deg, #7C5EF0 0%, #9B7FF5 100%)",
            boxShadow: isRunning ? "none" : "0 2px 12px rgba(124,94,240,0.4)",
          }}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-3.5 animate-spin" />
              Running...
            </>
          ) : (
            <>
              <PlayIcon className="size-3.5" />
              Run Code
            </>
          )}
        </button>
      </div>

      {/* EDITOR */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            padding: { top: 12, bottom: 12 },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            cursorBlinking: "smooth",
            smoothScrolling: true,
            renderLineHighlight: "line",
            lineDecorationsWidth: 8,
          }}
        />
      </div>
    </div>
  );
}

export default CodeEditorPanel;