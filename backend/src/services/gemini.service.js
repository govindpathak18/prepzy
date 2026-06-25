import { ENV } from "../lib/env.js";

const GEMINI_API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export class AiProviderError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const parseJsonResponse = (rawText) => {
  if (!rawText || typeof rawText !== "string") {
    throw new AiProviderError(502, "AI returned an empty response");
  }

  try {
    return JSON.parse(rawText);
  } catch {
    const start = rawText.indexOf("{");
    const end = rawText.lastIndexOf("}");

    if (start === -1 || end === -1 || end <= start) {
      throw new AiProviderError(502, "AI response was not valid JSON");
    }

    return JSON.parse(rawText.slice(start, end + 1));
  }
};

export const generateFromGemini = async ({
  prompt,
  responseMimeType = "application/json",
}) => {
  if (!ENV.GEMINI_API_KEY) {
    throw new AiProviderError(500, "Missing GEMINI_API_KEY environment variable");
  }

  const model = ENV.GEMINI_MODEL || "gemini-2.0-flash";
  const timeoutMs = Number(ENV.GEMINI_TIMEOUT_MS) || 30000;
  const maxRetries = Number(ENV.GEMINI_MAX_RETRIES) || 2;
  let lastError;

  for (let attempt = 0; attempt < maxRetries; attempt += 1) {
    try {
      const controller = new AbortController();
      const timeoutRef = setTimeout(() => controller.abort(), timeoutMs);
      const url = `${GEMINI_API_BASE}/${model}:generateContent?key=${ENV.GEMINI_API_KEY}`;

      let response;
      try {
        response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: {
              responseMimeType,
              temperature: 0.3,
            },
          }),
          signal: controller.signal,
        });
      } finally {
        clearTimeout(timeoutRef);
      }

      if (!response.ok) {
        const rawError = await response.text();
        const message = `Gemini API error: ${response.status} - ${rawError}`;

        if (response.status >= 400 && response.status < 500) {
          throw new AiProviderError(502, message);
        }

        throw new Error(message);
      }

      const data = await response.json();
      const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error("Gemini returned empty content");
      }

      return {
        model,
        rawText,
        usageMetadata: data?.usageMetadata || null,
      };
    } catch (error) {
      lastError = error;

      if (attempt < maxRetries - 1 && !error.statusCode) {
        await sleep(1000 * (attempt + 1));
        continue;
      }

      break;
    }
  }

  if (lastError instanceof AiProviderError) throw lastError;
  throw new AiProviderError(502, lastError?.message || "AI generation failed");
};
