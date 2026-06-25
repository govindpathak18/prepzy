import mongoose from "mongoose";

const resumeAnalysisSchema = new mongoose.Schema(
  {
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "AiSession",
      required: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    resumeScore: { type: Number, min: 0, max: 100, default: 0 },
    atsScore: { type: Number, min: 0, max: 100, default: 0 },
    missingKeywords: { type: [String], default: [] },
    suggestions: { type: [String], default: [] },
    improvements: { type: [String], default: [] },
    summary: { type: String, default: "" },
    aiMeta: {
      model: { type: String, default: "" },
      usageMetadata: { type: Object, default: null },
    },
  },
  { timestamps: true }
);

const ResumeAnalysis = mongoose.model("ResumeAnalysis", resumeAnalysisSchema);

export default ResumeAnalysis;
