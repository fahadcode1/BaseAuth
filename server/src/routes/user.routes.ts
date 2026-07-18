import express from "express"
import { verifyEmailOTP } from "../middleware/verifyEmailOTP.middleware"
import {handleGetMe, 
        handleChangeName,
        handleChangeEmail,
        handleSendEmailOtp,
        handleDeleteAccount,
        handleChangeMobileNumber,
        handleVerifyPendingEmail,
        handleChangePassword
        
    } from "../controllers/user.controller"
import { authMiddleware } from "../middleware/auth.middleware"



const userRoutes = express.Router()

userRoutes.get('/get-me', authMiddleware, handleGetMe)
userRoutes.post('/send-email-otp', authMiddleware, handleSendEmailOtp)
userRoutes.post('/verify-email', authMiddleware, handleVerifyPendingEmail)
userRoutes.patch('/change-mobile', authMiddleware, verifyEmailOTP, handleChangeMobileNumber)
userRoutes.patch('/change-password', authMiddleware, handleChangePassword)
userRoutes.patch('/change-name', authMiddleware, handleChangeName)
userRoutes.patch('/change-email', authMiddleware, handleChangeEmail, handleVerifyPendingEmail)
userRoutes.delete('/delete-account', authMiddleware, handleDeleteAccount)

export default userRoutes