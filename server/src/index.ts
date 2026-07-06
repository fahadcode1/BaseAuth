import cookieParser from "cookie-parser"
import cors from "cors"
import express from 'express'
import type {Express} from 'express'
import { connectDb } from './lib/db'
import { Request, Response } from "express"
import dns from "dns"
import authRoutes from './routes/auth.route'
import passwordRoutes from './routes/password.routes'
import userRoutes from './routes/user.routes'

dns.setServers(["1.1.1.1", "8.8.8.8"])
const PORT = 8000

const app:Express = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true  
}))

app.use("/api/auth", authRoutes)
app.use("/api/auth", passwordRoutes)
app.use("/api/user", userRoutes)

app.get("/test", (req : Request, res : Response)  =>  {
    res.json({ message: "CORS is working!" })
})


app.listen(PORT, ():void =>{
  console.log(`Server is running on ${PORT}`),
    connectDb()
  
})