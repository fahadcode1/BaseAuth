import express from "express"
import {handleChangePassword,
        handleForgotPassword, 
        handleResetPassword } from "../controllers/password.controller.js"        

const passwordRoutes = express.Router()

passwordRoutes.post('/change-password', handleChangePassword)
passwordRoutes.post('/forgot-password', handleForgotPassword)
passwordRoutes.post('/reset-password', handleResetPassword)