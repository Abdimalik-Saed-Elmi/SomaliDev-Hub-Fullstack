import { Router } from "express";
import { authMiddleware } from "src/middlewares/authMiddleware.js";
import { getMe } from "./userController.js";


const userRouter = Router();

userRouter.get("/me", authMiddleware, getMe);


export default userRouter;
