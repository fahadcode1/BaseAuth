import express from "express"
import userModel from "../models/userModel"
import bcrypt from "bcryptjs"
import crypto from "crypto"





export const handleregister = async (req, res) => {
    try {

            //get data from user
        const {firstName, lastName, email, mobileNumber, password} = req.body
            //check if email or Mobile number already exists or not
        const isAlreadyRegistered = await userModel.findOne({
            $or : [{email}, {mobileNumber}]
        })
            // check if email exists but not verified 
        if (isAlreadyRegistered){
            if (!isAlreadyRegistered.isVerifiedEmail){
                
                res.status(403).json({
                    success : false,
                    message : "Email not verified. OTP sent to your email.",
                    redirectTo : '/verify-email'
                })
            }
                // check if email already exists
            if (isAlreadyRegistered.email === email){
                return res.status(400).json({
                    success : false,
                    message : "Email already registered"
                })
            }
                // check if Mobile number already exists
            if (isAlreadyRegistered.mobileNumber === mobileNumber){
                return res.status(400).json({
                    success : false,
                    message : "Mobile Number already registered"
                })
            }            

        }

        // generate salt & hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        //create user
        const user = await userModel.create({
            firstName, 
            lastName,
            email,
            mobileNumber,
            password : hashedPassword
        })

        




    } catch (err) {
        console.error('Register error:', err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const handleVerifyEmail = async (req,res ) => {

}

export const handleVerifyPhone = async (req,res ) => {

}

export const handleLogin = async (req,res ) => {

}