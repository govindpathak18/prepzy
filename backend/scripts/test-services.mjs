import fs from "fs/promises";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

import {
  buildResumeDocx,
  buildResumePdf,
  resumeHtmlToText,
} from "../src/services/resumeDownload.service.js";
import { extractResumeText } from "../src/services/resumeExtractor.service.js";

const results = [];

const assert = (name, condition, detail = "") => {
  results.push({ name, ok: Boolean(condition), detail });
};

// resume download
const html =
  "<h1>Jane Doe</h1><p>Software Engineer with extensive experience in Node.js and React.</p>";
const text = resumeHtmlToText(html);
assert("resumeHtmlToText extracts text", text.includes("Jane Doe"));
const pdf = await buildResumePdf(html);
const docx = await buildResumeDocx(html);
assert("buildResumePdf returns buffer", pdf.length > 100);
assert("buildResumeDocx returns buffer", docx.length > 100);

// resume extractor (txt)
const samplePath = path.resolve("uploads", "resumes", "test-sample.txt");
await fs.mkdir(path.dirname(samplePath), { recursive: true });
const sampleContent =
  "Jane Doe\nSoftware Engineer\n5+ years building scalable web applications with Node.js, React, MongoDB.\n";
await fs.writeFile(samplePath, sampleContent, "utf8");

const extracted = await extractResumeText({
  mimetype: "text/plain",
  path: samplePath,
});
assert("extractResumeText from txt", extracted.includes("Jane Doe"));

for (const r of results) {
  console.log(`${r.ok ? "PASS" : "FAIL"} ${r.name}${r.detail ? ` (${r.detail})` : ""}`);
}

const failed = results.filter((r) => !r.ok).length;
console.log(`\nService tests: ${results.length - failed}/${results.length} passed`);
process.exit(failed ? 1 : 0);
