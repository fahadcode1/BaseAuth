import express from "express"
import{ handleregister,
        handleLogin, 
        handleRotateToken, 
        handleVerifyEmail,
        handleVerifyPhone,
        handleLogout,
        handleSendEmailOtp,
        
        } from "../controllers/auth.controller.js"
import { verify } from "node:crypto"

const authRoutes = express.Router()

authRoutes.post('/register', handleregister)
authRoutes.post('/login', handleLogin)
authRoutes.post('/rotate-token', handleRotateToken)
authRoutes.post('/verify-email', handleVerifyEmail)
authRoutes.post('/send-email-otp', verifyToken, sendEma)
authRoutes.post('/logout', handleLogout)
