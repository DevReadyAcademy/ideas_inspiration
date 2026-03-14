import mongoose from "mongoose";

const StyleGuideSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.StyleGuide || mongoose.model("StyleGuide", StyleGuideSchema);
