import express from "express";
import controller from "../controllers/cartController.js";

const router = express.Router();

router.post("/", controller.addToCart);

export default router;
