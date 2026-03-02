import mongoose from "mongoose";

const soilReportSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    soilData: {
      N: { type: Number, required: true },
      P: { type: Number, required: true },
      K: { type: Number, required: true },
      temperature: { type: Number, required: true },
      humidity: { type: Number, required: true },
      ph: { type: Number, required: true },
      rainfall: { type: Number, required: true },
    },

    soilAnalysis: {
      nitrogen_status: String,
      phosphorus_status: String,
      potassium_status: String,
      ph_status: String,
    },

    recommendedCrops: [String],

    fertilizerPlan: [
      {
        nutrient: String,
        suggestion: String,
      },
    ],
    nutrientPercentages: {
      nitrogen: Number,
      phosphorus: Number,
      potassium: Number,
    },

    approvedByAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

export default mongoose.model("SoilReport", soilReportSchema);
