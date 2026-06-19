import express from "express"
import { handleregister, handleLogin } from "../controllers/auth.controller"
const authRoutes = express.Router()

authRoutes.post('/register', handleregister)