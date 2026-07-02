import config from '../config/config'
import userModel from "../models/userModel"
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs"
import { sendEmailVerificationOtp } from "../utils/sendEmailOtp"
import { Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"


export const handleGetMe = async (req : Request, res : Response) => {
    try {
        const token = req.cookies?.accessToken

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            })
        }

        const decoded = jwt.verify(token, config.jwtAccessSecret as string) as JwtPayload
        const user = await userModel.findById(decoded.id)
        if (!user){
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "User fetched successfully",
            user: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                mobileNumber: user.mobileNumber
            }
        })

    } catch (err) {
        console.error('getMe error:', err)
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        })
    }
}

export const handleChangeEmail = async (req : Request, res : Response) => {
    
    try {
        if (!req.user || typeof req.user === "string") {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        const userId = req.user.userId
        const {newEmail} = req.body
        if (!newEmail ) {
            return res.status(404).json({
                success : false,
                message : "email or userId not found"
            })
        }
        const newEmailCheck = await userModel.findOne({ email: newEmail })
        if (newEmailCheck){
            return res.status(400).json({
                success : false,
                message : "Email is already registered"    
            })
        }

        const user = await userModel.findById(userId)
        if (!user){
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }
        user.pendingEmail = newEmail;
        await user.save()
        await sendEmailVerificationOtp(user)

        return res.status(200).json({
            success: true,
            message: "OTP sent to new email. Please verify.",
            redirectTo: "/verify-email"
        })

    } catch (err){
        console.error('changeEmail error:', err)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
        
    }

}

export const handleChangeName = async (req : Request, res : Response) => {
    try {
        if (!req.user || typeof req.user === "string") {
        return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const userId = req.user.userId
        

        const newFirstName = req.body.newFirstName?.trim()
        const newLastName  = req.body.newLastName?.trim()

        if (!newFirstName || !newLastName) {
            return res.status(400).json({
                success : false,
                message : "Names not provided"
            })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        user.firstName = newFirstName
        user.lastName  = newLastName
        await user.save()

        return res.status(200).json({
            success : true,
            message : "Name updated successfully"
        })

    } catch (err) {
        console.error("Change name Error :", err)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

export const handleSendEmailOtp = async (req : Request, res : Response) => {
    try {
        if (!req.user || typeof req.user === "string") {
        return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        const userId = req.user.userId

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        await sendEmailVerificationOtp(user)

        return res.status(200).json({
            success : true,
            message : "OTP sent to your registered email"
        })

    } catch (err) {
        console.error("Send Email OTP Error :", err)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

export const handleChangePassword = async (req: Request, res: Response) => {
    try {
        if (!req.user || typeof req.user === "string") {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }

        const userId = req.user.userId
        const { oldPassword, newPassword } = req.body

        if (!oldPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                message: "Old and new password are required"
            })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isValidPassword = await bcrypt.compare(oldPassword, user.password)

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(newPassword, salt)
        await user.save()

        return res.status(200).json({
            success: true,
            message: "Password changed successfully"
        })

    } catch (err) {
        console.error("changePassword error:", err)
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err instanceof Error ? err.message : "An error occurred"
        })
    }
}

export const handleChangeMobileNumber = async (req : Request, res : Response) => {
    try {
        if (!req.user || typeof req.user === "string") {
        return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        const userId = req.user.userId

        const { newMobileNumber } = req.body

        if (!newMobileNumber) {
            return res.status(400).json({
                success : false,
                message : "Mobile number not provided"
            })
        }

        const user = await userModel.findById(userId)

        if (!user) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        user.mobileNumber = newMobileNumber
        await user.save()

        return res.status(200).json({
            success : true,
            message : "Mobile number updated successfully"
        })

    } catch (err) {
        console.error("Change Mobile Number Error :", err)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}

export const handleDeleteAccount = async (req : Request, res : Response) => {
    try {
        if (!req.user || typeof req.user === "string") {
        return res.status(401).json({ success: false, message: "Unauthorized" })
        }   
        const userId = req.user.userId

        const user = await userModel.findByIdAndDelete(userId)

        if (!user) {
            return res.status(404).json({
                success : false,
                message : "User not found"
            })
        }

        return res.status(200).json({
            success : true,
            message : "Account deleted successfully"
        })

    } catch (err) {
        console.error("Delete Account Error :", err)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
    }
}


export const handleVerifyPendingEmail = async (req: Request, res: Response) => {
    try {
        if (!req.user || typeof req.user === "string") {
            return res.status(401).json({ success: false, message: "Unauthorized" })
        }
        const userId = req.user.userId
        const { otp } = req.body   // no email needed from body at all

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" })
        }
        if (!user.pendingEmail) {
            return res.status(400).json({ success: false, message: "No pending email change found" })
        }
        if (!user.emailOtpExpiry || user.emailOtpExpiry < new Date()) {
            return res.status(400).json({ success: false, message: "OTP expired, please request a new one" })
        }
        if (!user.emailOtp) {
            return res.status(400).json({ success: false, message: "OTP not found" })
        }

        const otpMatch = await bcrypt.compare(String(otp), user.emailOtp)
        if (!otpMatch) {
            return res.status(400).json({ success: false, message: "Invalid OTP" })
        }

        user.email = user.pendingEmail     
        user.pendingEmail = undefined
        user.emailOtp = undefined
        user.emailOtpExpiry = undefined
        await user.save()

        return res.status(200).json({ success: true, message: "Email changed successfully" })

    } catch (err) {
        console.error("Verify pending email error", err)
        return res.status(500).json({ success: false, message: "Internal server error" })
    }
}