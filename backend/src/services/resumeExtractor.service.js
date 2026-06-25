import fs from "fs/promises";
import mammoth from "mammoth";
import pdfParse from "pdf-parse";

export const buildUploadedResume = (file) => {
  if (!file) return null;

  return {
    originalName: file.originalname,
    fileName: file.filename,
    path: file.path,
    mimeType: file.mimetype,
    size: file.size,
    uploadedAt: new Date(),
  };
};

export const extractResumeText = async (file) => {
  if (!file) {
    throw new Error("Resume file is required");
  }

  if (file.mimetype === "text/plain") {
    return fs.readFile(file.path, "utf8");
  }

  if (file.mimetype === "application/pdf") {
    const buffer = await fs.readFile(file.path);
    const parsed = await pdfParse(buffer);
    return parsed.text || "";
  }

  if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const parsed = await mammoth.extractRawText({ path: file.path });
    return parsed.value || "";
  }

  throw new Error("Unsupported resume file type");
};
