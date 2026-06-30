import express from "express"
import {handleForgotPassword, 
        handleResetPassword } from "../controllers/password.controller"        

const passwordRoutes = express.Router()


passwordRoutes.post('/forgot-password', handleForgotPassword)
passwordRoutes.post('/reset-password', handleResetPassword)

export default passwordRoutes