import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  getRecommendedProducts
} from "../controllers/productController.js";
import auth from "../middlewares/authMiddleware.js";
import adminOnly from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* USER */
router.get("/recommended", auth, getRecommendedProducts);
router.get("/", getProducts);
router.get("/:id", getProductById);

/* ADMIN */
router.post("/", auth, adminOnly, createProduct);

export default router;
