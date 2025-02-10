// routes/authRoutes.js
import express from "express";
import {
  register,
  login,
  uploadAvatar,
} from "../controllers/authController.js";
import upload from "../models/middlewares/upload.js";
import auth from "../models/middlewares/auth.js";

const router = express.Router();

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Upload avatar route
router.post("/upload", auth, upload.single("avatar"), uploadAvatar);

export default router;
