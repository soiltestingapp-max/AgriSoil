import express from "express";
import {
  createSoilReport,
  extractSoilDataFromImage,
  getMyReports,
  getAllReports,
  approveReport
} from "../controllers/soilReportController.js";

import auth from "../middlewares/authMiddleware.js";
import admin from "../middlewares/adminMiddleware.js";
import multer from "multer";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

/* ============================= */
/* USER ROUTES */
/* ============================= */

// Extract soil values from lab report / kit strip image (OCR)
router.post("/extract-from-image", auth, upload.single("image"), extractSoilDataFromImage);

// Create new soil report
router.post("/", auth, createSoilReport);

// Get logged in user's reports
router.get("/my", auth, getMyReports);

/* ============================= */
/* ADMIN ROUTES */
/* ============================= */

// Get all reports
router.get("/", auth, admin, getAllReports);

// Approve report
router.put("/:id/approve", auth, admin, approveReport);

export default router;