import bcrypt from "bcryptjs"
import userModel from "../models/userModel"
import { Request, Response, NextFunction } from "express"
import { JwtPayload } from "jsonwebtoken"

export const verifyEmailOTP = async (req : Request, res : Response, next: NextFunction) => {
    try {
        const otp = req.body.otp
        const userId = (req.user as JwtPayload).userId 

        if (!otp) {
            return res.status(400).json({
                success : false,
                message : "OTP not provided"
            })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        if (!user.emailOtpExpiry || user.emailOtpExpiry < new Date(Date.now())) {
            return res.status(400).json({
                success : false,
                message : "OTP expired"
            })
        }

        if (!user.emailOtp) {
        return res.status(400).json({
        success: false,
        message: "OTP not found, please request a new one"
            })
        }

        const otpMatch = await bcrypt.compare(otp, user.emailOtp)

        if (!otpMatch) {
            return res.status(400).json({
                success : false,
                message : "Invalid OTP"
            })
        }

        user.emailOtp     = undefined
        user.emailOtpExpiry = undefined
        await user.save()

        next()

    } catch (err) {
        console.error("Verify Email OTP Error :", err)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}