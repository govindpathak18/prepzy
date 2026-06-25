import mongoose from "mongoose";

const activityLogSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const uploadedResumeSchema = new mongoose.Schema(
  {
    originalName: { type: String, default: "" },
    fileName: { type: String, default: "" },
    path: { type: String, default: "" },
    mimeType: { type: String, default: "" },
    size: { type: Number, default: 0 },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const aiSessionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    sessionName: {
      type: String,
      required: true,
      trim: true,
    },
    jobRole: {
      type: String,
      default: "",
      trim: true,
      index: true,
    },
    company: {
      type: String,
      default: "",
      trim: true,
    },
    skills: {
      type: [String],
      default: [],
    },
    experience: {
      type: String,
      default: "",
      trim: true,
    },
    selfDescription: {
      type: String,
      required: true,
      trim: true,
      maxlength: 5000,
    },
    jobDescription: {
      type: String,
      required: true,
      trim: true,
    },
    uploadedResume: {
      type: uploadedResumeSchema,
      default: null,
    },
    extractedResumeText: {
      type: String,
      required: true,
      trim: true,
    },
    interviewStatus: {
      type: String,
      enum: ["not-started", "in-progress", "completed"],
      default: "not-started",
      index: true,
    },
    lastAccessedAt: {
      type: Date,
      default: Date.now,
    },
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    activityLog: {
      type: [activityLogSchema],
      default: [],
    },
  },
  { timestamps: true }
);

aiSessionSchema.index({ user: 1, isDeleted: 1, updatedAt: -1 });

const AiSession = mongoose.model("AiSession", aiSessionSchema);

export default AiSession;
