import express from "express";
import cors from "cors"
import authRouter from "./modules/auth/authRoute.js";

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)

app.get("/",  (_, res) =>{
    res.json({msg: "somaliDev Hub Api is Running"})
})

export default app