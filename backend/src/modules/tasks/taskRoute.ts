import { Router } from "express";
import { authMiddleware } from "src/middlewares/authMiddleware.js";
import { createTask, getProjectTasks, toggleTask } from "./taskController.js";

const taskRoute = Router();

taskRoute.post("/", authMiddleware, createTask);
taskRoute.get("/:projectId", authMiddleware, getProjectTasks);
taskRoute.patch("/:id", authMiddleware, toggleTask);

export default taskRoute;
