import axios from "axios";
import SoilReport from "../models/SoilReport.js";
import { createWorker } from "tesseract.js";

/* ============================= */
/* USER: Create Soil Report */
/* ============================= */
export const createSoilReport = async (req, res) => {
  try {
    const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

    // 🔥 Call Python AI Service
    const aiBaseUrl = process.env.AI_BASE_URL || "http://127.0.0.1:8000";
    const aiResponse = await axios.post(`${aiBaseUrl}/predict`, {
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

function extractFirstNumberNearLabel(text, labels) {
  if (!text) return null;
  const normalized = text.replace(/\s+/g, " ").toLowerCase();
  const labelGroup = labels.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");

  // Matches like: "Nitrogen (N): 90", "N 90", "N=90", "pH 6.5"
  const re = new RegExp(
    `(?:\\b(?:${labelGroup})\\b)[^0-9]{0,10}(-?\\d+(?:\\.\\d+)?)`,
    "i",
  );
  const m = normalized.match(re);
  if (!m) return null;
  const n = Number(m[1]);
  return Number.isFinite(n) ? n : null;
}

export const extractSoilDataFromImage = async (req, res) => {
  try {
    if (!req.file?.buffer) {
      return res.status(400).json({ message: "image file is required" });
    }

    const worker = await createWorker("eng");
    const {
      data: { text },
    } = await worker.recognize(req.file.buffer);
    await worker.terminate();

    const N = extractFirstNumberNearLabel(text, ["nitrogen", "n"]);
    const P = extractFirstNumberNearLabel(text, ["phosphorus", "p"]);
    const K = extractFirstNumberNearLabel(text, ["potassium", "k"]);
    const ph = extractFirstNumberNearLabel(text, ["ph"]);
    const temperature = extractFirstNumberNearLabel(text, ["temperature", "temp", "°c", "c"]);
    const humidity = extractFirstNumberNearLabel(text, ["humidity", "rh", "%"]);
    const rainfall = extractFirstNumberNearLabel(text, ["rainfall", "rain", "mm"]);

    res.json({
      extracted: {
        N,
        P,
        K,
        temperature,
        humidity,
        ph,
        rainfall,
      },
      rawText: (text || "").slice(0, 4000),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to extract soil data from image" });
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
