const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_IDS = {
  javascript: 93,
  python: 71,
  java: 62,
  cpp: 54,
};

function toBase64(str) {
  const bytes = new TextEncoder().encode(str);
  const binary = Array.from(bytes).map((b) => String.fromCharCode(b)).join("");
  return btoa(binary);
}

function fromBase64(str) {
  if (!str) return "";
  const binary = atob(str);
  const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export async function executeCode(language, code, input = "") {
  try {
    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return { success: false, error: `${language} is not supported` };
    }

    const response = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=true&wait=true`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source_code: toBase64(code),
          language_id: languageId,
          stdin: input ? toBase64(input) : "",
          cpu_time_limit: 5,
          cpu_extra_time: 1,
          memory_limit: 128000,
        }),
      }
    );

    if (!response.ok) {
      return { success: false, error: `Submission failed: ${response.status}` };
    }

    const result = await response.json();

    const stdout = fromBase64(result.stdout || "").trim();
    const stderr = fromBase64(result.stderr || "").trim();
    const compileError = fromBase64(result.compile_output).trim();
    const statusId = result.status?.id;
    const statusDesc = result.status?.description || "Unknown error";

    if (statusId !== 3) {
      let errorMessage = "";

      if (statusId === 5) {
        errorMessage = `Time Limit Exceeded — your code ran for longer than ${result.time || "?"}s`;
      } else if (statusId === 6) {
        errorMessage = `Compilation Error:\n${compileError}`;
      } else if (statusId === 7 || statusId === 8 || statusId === 11) {
        errorMessage = `Runtime Error (${statusDesc}):\n${stderr}`;
      } else {
        errorMessage = `${statusDesc}${stderr ? `:\n${stderr}` : ""}${compileError ? `:\n${compileError}` : ""}`;
      }

      return {
        success: false,
        output: stdout || "",
        error: errorMessage,
        executionTime: result.time,
      };
    }

    return {
      success: true,
      output: stdout || "no output",
      executionTime: result.time,
    };
  } catch (error) {
    return { success: false, error: error.message || "Execution failed" };
  }
}