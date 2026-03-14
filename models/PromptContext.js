import mongoose from "mongoose";

const PromptContextSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.PromptContext || mongoose.model("PromptContext", PromptContextSchema);
