import express from "express";
import cors from "cors"
import authRouter from "./modules/auth/authRoute.js";
import userRouter from "./modules/user/userRoute.js";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter);


app.get("/",  (_, res) =>{
    res.json({msg: "somaliDev Hub Api is Running"})
})

export default app