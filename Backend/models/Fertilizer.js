import mongoose from "mongoose";

const fertilizerSchema = new mongoose.Schema(
  {
    nutrient: {
      type: String,
      enum: ["Nitrogen", "Phosphorus", "Potassium"],
      required: true
    },

    chemical: String,
    organic: String
  },
  { timestamps: true }
);

export default mongoose.model("Fertilizer", fertilizerSchema);
