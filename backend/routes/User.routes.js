import express from "express";
import { login, signup } from "../controllers/User.controller.js";
import { protect } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", protect, getUserDetails);

export default router;
