import mongoose from "mongoose";

const knowledgeSchema = new mongoose.Schema(
  {
    title: String,
    content: String,
    category: String
  },
  { timestamps: true }
);

export default mongoose.model("Knowledge", knowledgeSchema);
