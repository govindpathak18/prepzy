import mongoose from "mongoose";

const generatedQuestionSchema = new mongoose.Schema(
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
    answerGuide: { type: String, default: "", trim: true },
    followUps: { type: [String], default: [] },
  },
  { _id: false }
);

const questionSetSchema = new mongoose.Schema(
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
    title: {
      type: String,
      default: "Generated Questions",
      trim: true,
    },
    questions: {
      type: [generatedQuestionSchema],
      default: [],
    },
    aiMeta: {
      model: { type: String, default: "" },
      usageMetadata: { type: Object, default: null },
    },
  },
  { timestamps: true }
);

const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);

export default QuestionSet;
