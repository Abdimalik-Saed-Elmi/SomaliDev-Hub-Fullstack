import { Router } from "express";
import { authMiddleware } from "src/middlewares/authMiddleware.js";
import { createProject, deleteProject, getMyProjects, updateProject } from "./projectController.js";


const projectRoute = Router();

projectRoute.post("/", authMiddleware, createProject);
projectRoute.get("/", authMiddleware, getMyProjects);
projectRoute.put("/:id", authMiddleware, updateProject);
projectRoute.delete("/:id", authMiddleware, deleteProject);

export default projectRoute;
