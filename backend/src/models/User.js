import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    editorPreferences: {
      defaultLanguage: {
        type: String,
        enum: ["cpp", "java", "python", "javascript"],
        default: "cpp",
      },
      theme: {
        type: String,
        default: "vs-dark",
      },
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

const User = mongoose.model("User", userSchema);

export default User;
