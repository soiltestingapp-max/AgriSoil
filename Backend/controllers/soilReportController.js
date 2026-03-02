import axios from "axios";
import SoilReport from "../models/SoilReport.js";

/* ============================= */
/* USER: Create Soil Report */
/* ============================= */
export const createSoilReport = async (req, res) => {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    // 🔥 Call Python AI Service
    const aiResponse = await axios.post("http://127.0.0.1:8000/predict", {
      N,
      P,
      K,
      temperature,
      humidity,
      ph,
      rainfall,
    });

    const aiData = aiResponse.data;

    const newReport = await SoilReport.create({
      user: req.user.id,
      soilData: { N, P, K, temperature, humidity, ph, rainfall },
      soilAnalysis: aiData.soil_analysis,
      nutrientPercentages: aiData.nutrient_percentages,
      recommendedCrops: [aiData.recommended_crop],
      fertilizerPlan: aiData.fertilizer_recommendation.map((item) => ({
        nutrient: "AI Suggestion",
        suggestion: item,
      })),
    });

    res.status(201).json(newReport);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Failed to generate soil report" });
  }
};

/* ============================= */
/* USER: Get Own Reports */
/* ============================= */
export const getMyReports = async (req, res) => {
  try {
    const reports = await SoilReport.find({ user: req.user.id });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================= */
/* ADMIN: Get All Reports */
/* ============================= */
export const getAllReports = async (req, res) => {
  try {
    const reports = await SoilReport.find().populate("user", "name email");
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ============================= */
/* ADMIN: Approve Report */
/* ============================= */
export const approveReport = async (req, res) => {
  try {
    const updatedReport = await SoilReport.findByIdAndUpdate(
      req.params.id,
      { approvedByAdmin: true },
      { new: true, runValidators: false }
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Report not found" });
    }

    res.json({ message: "Report approved successfully" });

  } catch (error) {
    console.error("Approve Error:", error);
    res.status(500).json({ message: error.message });
  }
};
