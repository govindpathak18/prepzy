import mongoose from "mongoose";

const generatedResumeSchema = new mongoose.Schema(
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
    versionName: {
      type: String,
      default: "ATS Resume",
      trim: true,
    },
    html: {
      type: String,
      required: true,
    },
    plainText: {
      type: String,
      default: "",
    },
    aiMeta: {
      model: { type: String, default: "" },
      usageMetadata: { type: Object, default: null },
    },
  },
  { timestamps: true }
);

const GeneratedResume = mongoose.model("GeneratedResume", generatedResumeSchema);

export default GeneratedResume;
