import mongoose from "mongoose";

const answerSchema = new mongoose.Schema(
  {
    questionId: { type: mongoose.Schema.Types.ObjectId, required: true },
    answer: { type: String, default: "", trim: true },
    score: { type: Number, min: 0, max: 100, default: null },
    feedback: { type: String, default: "", trim: true },
    answeredAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const questionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["technical", "behavioral", "hr", "system-design", "coding", "other"],
      default: "technical",
    },
    difficulty: {
      type: String,
      enum: ["easy", "medium", "hard"],
      default: "medium",
    },
    question: { type: String, required: true, trim: true },
    expectedAnswer: { type: String, default: "", trim: true },
    followUps: { type: [String], default: [] },
  },
  { timestamps: true }
);

const aiInterviewSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ["in-progress", "completed"],
      default: "in-progress",
      index: true,
    },
    currentQuestionIndex: {
      type: Number,
      default: 0,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
    answers: {
      type: [answerSchema],
      default: [],
    },
    evaluationReport: {
      overallScore: { type: Number, min: 0, max: 100, default: null },
      strengths: { type: [String], default: [] },
      improvements: { type: [String], default: [] },
      summary: { type: String, default: "" },
    },
    aiMeta: {
      model: { type: String, default: "" },
      usageMetadata: { type: Object, default: null },
    },
  },
  { timestamps: true }
);

const AiInterview = mongoose.model("AiInterview", aiInterviewSchema);

export default AiInterview;
