import express from "express";
import orderController from "../controllers/orderController.js";
import auth from "../middlewares/authMiddleware.js";
import admin from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* USER */
router.post("/", auth, orderController.placeOrder);
router.get("/user/:userId", auth, orderController.getOrdersByUser);

/* ADMIN */
router.get("/", auth, admin, orderController.getAllOrders);
router.put("/:id", auth, admin, orderController.updateOrderStatus);

export default router;