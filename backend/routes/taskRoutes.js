import express from "express";
import { createTask, getTasks, updateTaskStatus } from "../controllers/taskController.js";

const router = express.Router();

router.post("/create", createTask);
router.get("/get", getTasks);
router.patch("/:id", updateTaskStatus);

export default router;
