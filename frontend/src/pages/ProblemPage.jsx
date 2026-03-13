import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { PROBLEMS } from "../../data/problems";
import Navbar from "../components/Navbar";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import ProblemDescription from "../components/ProblemDescription";
import OutputPanel from "../components/OutputPanel";
import CodeEditorPanel from "../components/CodeEditorPanel";

import { executeCode } from "../lib/judge0.js";

import toast from "react-hot-toast";
import confetti from "canvas-confetti";

const CONFETTI_CONFIG = {
  particleCount: 80,
  spread: 250,
};

function ProblemPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const currentProblem = useMemo(() => {
    return PROBLEMS[id] ?? PROBLEMS["two-sum"];
  }, [id]);

  const [selectedLanguage, setSelectedLanguage] = useState("cpp");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  // Load code when problem or language changes
  useEffect(() => {
    const savedCode = localStorage.getItem(
      `code-${currentProblem.id}-${selectedLanguage}`
    );

    if (savedCode) {
      setCode(savedCode);
    } else {
      setCode(
        currentProblem.starterCode[selectedLanguage] ??
        "// No starter code available"
      );
    }

    setOutput(null);
  }, [currentProblem, selectedLanguage]);

  // Save code to localStorage
  useEffect(() => {
    if (code.trim()) {
      localStorage.setItem(
        `code-${currentProblem.id}-${selectedLanguage}`,
        code
      );
    }
  }, [code, currentProblem.id, selectedLanguage]);

  // Keyboard shortcut (Ctrl + Enter)
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        runCode();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [code, selectedLanguage]);

  const handleLanguageChange = ({ target: { value } }) => {
    setSelectedLanguage(value);
    setOutput(null);
  };

  const handleProblemChange = (newProblemId) => {
    navigate(`/problem/${newProblemId}`);
  };

  const triggerConfetti = () => {
    confetti({ ...CONFETTI_CONFIG, origin: { x: 0.2, y: 0.6 } });
    confetti({ ...CONFETTI_CONFIG, origin: { x: 0.8, y: 0.6 } });
  };

  const normalizeOutput = (text) => {
    if (!text) return "";

    return text
      .trim()
      .split("\n")
      .map((line) =>
        line
          .trim()
          .replace(/\[\s+/g, "[")
          .replace(/\s+\]/g, "]")
          .replace(/\s*,\s*/g, ",")
      )
      .filter(Boolean)
      .join("\n");
  };

  const checkIfTestsPassed = (actualOutput, expectedOutput) => {
    return normalizeOutput(actualOutput) === normalizeOutput(expectedOutput);
  };

  const runCode = async () => {
    if (isRunning) return;

    setIsRunning(true);
    setOutput(null);

    try {
      const result = await executeCode(selectedLanguage, code);

      setOutput(result);

      if (!result.success) {
        toast.error("Code execution failed");
        return;
      }

      const expectedOutput =
        currentProblem.expectedOutput[selectedLanguage];

      const testsPassed = checkIfTestsPassed(
        result.output,
        expectedOutput
      );

      if (testsPassed) {
        triggerConfetti();
        toast.success("All tests passed! Great job!");
      } else {
        toast.error("Tests failed. Check your output!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Execution server error");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-screen bg-base-100 flex flex-col">
      <Navbar />

      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">

          {/* Left Panel */}
          <Panel defaultSize={40} minSize={30}>
            <div className="h-full overflow-y-auto">
              <ProblemDescription
                problem={currentProblem}
                currentProblemId={id ?? "two-sum"}
                onProblemChange={handleProblemChange}
                allProblems={Object.values(PROBLEMS)}
              />
            </div>
          </Panel>

          <PanelResizeHandle className="w-1.5 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />

          {/* Right Panel */}
          <Panel defaultSize={60} minSize={30}>
            <PanelGroup direction="vertical">

              {/* Code Editor */}
              <Panel defaultSize={70} minSize={30}>
                <div className="h-full overflow-hidden">
                  <CodeEditorPanel
                    selectedLanguage={selectedLanguage}
                    code={code}
                    isRunning={isRunning}
                    onLanguageChange={handleLanguageChange}
                    onCodeChange={setCode}
                    onRunCode={runCode}
                  />
                </div>
              </Panel>

              <PanelResizeHandle className="h-1.5 bg-base-300 hover:bg-primary transition-colors cursor-row-resize" />

              {/* Output Panel */}
              <Panel defaultSize={30} minSize={10}>
                <div className="h-full overflow-y-auto">
                  <OutputPanel output={output} />
                </div>
              </Panel>

            </PanelGroup>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}

export default ProblemPage;