import { Router } from "express";
import { authMiddleware } from "src/middlewares/authMiddleware.js";
import { isAdmin } from "src/middlewares/roleMiddleware.js";
import { getAllUsers } from "./adminController.js";


const adminRoutes = Router();

adminRoutes.get("/users", authMiddleware, isAdmin, getAllUsers);

export default adminRoutes;
