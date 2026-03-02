import mongoose from "mongoose";

const cropSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    suitablePH: {
      min: Number,
      max: Number
    },

    nitrogenLevel: String,
    phosphorusLevel: String,
    potassiumLevel: String
  },
  { timestamps: true }
);

export default mongoose.model("Crop", cropSchema);
