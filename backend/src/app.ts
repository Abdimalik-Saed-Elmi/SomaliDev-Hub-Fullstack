import express from "express";
import cors from "cors"
import authRouter from "./modules/auth/authRoute.js";
import userRouter from "./modules/user/userRoute.js";
import adminRoutes from "./modules/admin/adminRoute.js";
import taskRoute from "./modules/tasks/taskRoute.js";
import projectRoute from "./modules/project/projectRoute.js";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter);
app.use("/api/admin", adminRoutes);
app.use("/api/tasks", taskRoute);
app.use("/api/projects", projectRoute);




app.get("/",  (_, res) =>{
    res.json({msg: "somaliDev Hub Api is Running"})
})

export default app