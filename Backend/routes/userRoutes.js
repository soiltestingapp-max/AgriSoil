import express from "express";
import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/userController.js";

import auth from "../middlewares/authMiddleware.js";
import admin from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.get("/", auth, admin, getAllUsers);
router.put("/:id/role", auth, admin, updateUserRole);
router.delete("/:id", auth, admin, deleteUser);

export default router;