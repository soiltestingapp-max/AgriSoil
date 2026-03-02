import express from "express";
import { approveReport,getAdminStats } from "../controllers/adminController.js";
import auth from "../middlewares/authMiddleware.js";
import admin from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* ADMIN: Approve soil report */
router.get("/stats", auth, admin, getAdminStats);
router.put("/reports/:id/approve", auth, admin, approveReport);


export default router;
