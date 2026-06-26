import express from "express"
import { verifyEmailOTP } from "../middleware/verifyEmailOTP.middleware.js"
import {handleGetMe, 
        handleChangeName,
        handleChangeEmail,
        handleChangeMobileNumber,
        handleSendEmailOtp,
        handleDeleteAccount,
        handleChangeMobileNumber
        
    } from "../controllers/user.controller.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { verify } from "node:crypto"


const userRoutes = express.Router()

userRoutes.get('/get-me', authMiddleware, handleGetMe)
userRoutes.post('/send-email-otp, ', authMiddleware, handleSendEmailOtp)
userRoutes.patch('/change-mobile', authMiddleware, verifyEmailOTP, handleChangeMobileNumber)
userRoutes.patch('/change-name', authMiddleware, handleChangeName)
userRoutes.patch('/change-email', authMiddleware, handleChangeEmail)
userRoutes.delete('/delete-account', authMiddleware, handleDeleteAccount)