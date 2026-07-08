import express from "express"
import{ handleregister,
        handleLogin, 
        handleRotateToken, 
        handleVerifyEmail,
        handleResendEmailOtp,
        handleLogout,
        
        } from "../controllers/auth.controller"


const authRoutes = express.Router()

authRoutes.post('/register', handleregister)
authRoutes.post('/login', handleLogin)
authRoutes.post('/rotate-token', handleRotateToken)
authRoutes.post('/resend-otp', handleResendEmailOtp )
authRoutes.post('/verify-account', handleVerifyEmail)
authRoutes.post('/logout', handleLogout)

export default authRoutes