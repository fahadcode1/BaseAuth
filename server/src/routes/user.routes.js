import express from "express"
import {handleGetMe, 
        handleChangeName,
        handleChangeEmail,
        handleChangeMobileNumber,
        handleDeleteAccount
    } from "../controllers/user.controller.js"

const userRoutes = express.Router()

userRoutes.get('/get-me', authMiddleware, handleGetMe)
userRoutes.patch('/change-name', authMiddleware, handleChangeName)
userRoutes.patch('/change-email', authMiddleware, handleChangeEmail)
userRoutes.patch('/change-mobile', authMiddleware, handleChangeMobileNumber)
userRoutes.delete('/delete-account', authMiddleware, handleDeleteAccount)