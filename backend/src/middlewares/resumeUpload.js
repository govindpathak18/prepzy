import fs from "fs";
import path from "path";
import multer from "multer";

const uploadDir = path.resolve("uploads", "resumes");

fs.mkdirSync(uploadDir, { recursive: true });

const allowedMimeTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "text/plain",
]);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, uploadDir);
  },
  filename: (_req, file, callback) => {
    const extension = path.extname(file.originalname).toLowerCase();
    const safeBaseName = path
      .basename(file.originalname, extension)
      .replace(/[^a-z0-9-_]+/gi, "-")
      .slice(0, 80);

    callback(null, `${Date.now()}-${safeBaseName}${extension}`);
  },
});

export const resumeUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
  fileFilter: (_req, file, callback) => {
    if (!allowedMimeTypes.has(file.mimetype)) {
      const error = new Error("Resume must be a PDF, DOCX, or TXT file");
      error.statusCode = 400;
      return callback(error);
    }

    callback(null, true);
  },
});
