import express from "express";
import {
  createSoilReport,
  getMyReports,
  getAllReports,
  approveReport
} from "../controllers/soilReportController.js";

import auth from "../middlewares/authMiddleware.js";
import admin from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* ============================= */
/* USER ROUTES */
/* ============================= */

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