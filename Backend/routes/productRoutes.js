import express from "express";
import {
  createProduct,
  getProducts
} from "../controllers/productController.js";
import auth from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* USER */
router.get("/", getProducts);

/* ADMIN */
router.post("/", auth, adminOnly, createProduct);

export default router;
