import express from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController.js";

const router = express.Router();

router.post("/", createTask);
router.get("/", getTasks);
router.patch("/:id", updateTaskStatus);

export default router;
