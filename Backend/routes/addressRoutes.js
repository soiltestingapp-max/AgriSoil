import express from "express";
import controller from "../controllers/addressController.js";

const router = express.Router();

router.post("/", controller.addAddress);

export default router;
