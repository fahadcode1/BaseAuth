
import userModel from "../models/userModel"
import sessionModel from "../models/sessionModel"
import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt from 'jsonwebtoken';
import { sendEmailVerificationOtp } from "../utils/sendEmailOtp"
import { Request, Response } from "express"
import { JwtPayload } from "jsonwebtoken"




export const handleregister = async (req : Request, res : Response) => {
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
        //send verification otp and redirect on verification page
        await sendEmailVerificationOtp(user)

        return res.status(201).json({
            success : true,
            message : "Registered successfully. OTP sent to your email.",
            email : user.email,
            redirectTo : '/verify-email'
        })


    } catch (err) {
        console.error('Register error:', err)
        return res.status(500).json({ success: false, message: 'Internal server error' })
    }
}

export const handleVerifyEmail = async (req : Request, res : Response ) => {
    
    try {
        const {email, otp} = req.body
        console.log("OTP from request", otp)

        const user = await userModel.findOne({email})
        
        if(!user)   {
            return res.status(404).json({
                success : false,
                message : "Email is not registered"
            })
        }
        if (user.isVerifiedEmail){
            return res.status(400).json({
                success : false,
                message : "Email is already verified"
            })

        }

        if (!user.emailOtpExpiry || user.emailOtpExpiry < new Date(Date.now())){
            return res.json(400).json({
                success : false,
                message : "OTP expired,Please request a new one"
            })
        }

        if (!user.emailOtp) {
            return res.status(400).json({ success: false, message: "OTP not found" })
        }
        const otpMatch = await bcrypt.compare(String(otp), user.emailOtp)
        console.log("OTP match result:", otpMatch)
        if (!otpMatch){
            return res.status(400).json({
                success : false,
                message : "Invalid OTP"
            })
        }

        user.isVerifiedEmail = true;
        user.emailOtp = undefined;
        user.emailOtpExpiry = undefined;

        await user.save()

        return res.status(200).json({
            success : true,
            message : "Account verified successfully"
        })

     } catch (err) {
        console.log("Verify OTP error", err)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })

    }

}

export const handleResendEmailOtp = async (req : Request, res : Response) => {
    try {
        const {email} = req.body
        const user = await userModel.findOne({email})
        
        //Check if email exists
        if (!user) {
            return res.status(400).json({
                success: true,
                message : "Email is not Registered, Please register email first"
            })
        }
        //check if user is already verified
        if (user.isVerifiedEmail)    {
            return res.status(400).json({
                success : false,
                message : "User is Already Verified"
            })
        }
        //generate new otp
        await sendEmailVerificationOtp(user)


        return res.status(200).json({
            success : false,
            message : "OTP has been sent on Email"
        })

    } catch(err){
        console.error('Re-send OTP error', err)
        console.log(err)
        res.status(500).json({
            success : true,
            message : "Internal server error"
        })

    }
}

export const handleVerifyPhone = async (req : Request, res : Response) => {
    try  {
        const {mobileNumber, otp} = req.body
        console.log("OTP from request:", otp)

        const user = await userModel.findOne({mobileNumber})
        if (!user){
            return res.status(404).json({
                success : false,
                message : "Mobile number is not registered"
            })
        }

        if(user.isVerifiedMobileNumber){
            return res.status(400).json({
                success : false,
                message : "Mobile number is already verified"
            })
        }

        if (!user.mobileNumberOtpExpiry || user.mobileNumberOtpExpiry < new Date(Date.now())){
            return res.status(400).json({
                success : false,
                message : "OTP expired,Please request a new one"
            })
        }
        
    if (!user.mobileNumberOtp){
        return res.status(400).json({
            success : false,
            message: "OTP not found"
        })
    }    
    const otpMatch = await bcrypt.compare(String(otp), user.mobileNumberOtp)
    console.log("OTP match result:", otpMatch)

    if (!otpMatch) {
        return res.status(400).json({
            success : false,
            message : "Invalid OTP"
        })
    }
    
    user.isVerifiedMobileNumber = true;
    user.mobileNumberOtp = undefined;
    user.mobileNumberOtpExpiry = undefined;
    await user.save()

    return res.status(200).json({
    sucess : true,
    message : "Account verified successfully"
    })

    } catch(err) {
        
        console.error('Verify OTP Error :', err)
        return res.status(500).json({
            sucess: false,
            message : "Internal server error"
        })

     }
}

export const handleLogin = async (req : Request, res : Response) => {
        
    try {
        const {email,mobileNumber, password} = req.body 

        if (!password || (!email && !mobileNumber)) {
            return res.status(400).json({
                success : false,
                message : "Email or mobile number, and password are required"
            })
        }

        const user = await userModel.findOne({
            $or : [
                ...(email ? [{email}] : []),
                ...(mobileNumber? [{mobileNumber}] : [])
            ]
        })

        if (!user){
            return res.status(401).json({
                success : false,
                message :"Email or Mobile Number is not registered"
            })
        }

        if (!user.isVerifiedEmail){
            await sendEmailVerificationOtp(user)

            return res.status(403).json({
                success : false,
                message : "Email not verified. OTP sent to your email.",
                email : user.email,
                redirectTo: '/verify-email'
            })
        }

        const isValidPassword = await bcrypt.compare(password, user.password)

        if (!isValidPassword){
            return res.status(401).json({
                success : false,
                message : "Invalid credentials"
            })
        }

        const session = await sessionModel.create({
            user : user._id,
            ip : req.ip,
            userAgent : req.headers["user-agent"]
        })
        const refreshToken : string = jwt.sign(
            {id : user._id, sessionId : session._id},
            process.env.JWT_REFRESH_SECRET as string,
            {expiresIn : "7d"}
        )

        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")
        await session.updateOne({ refreshTokenHash })



        const accessToken = jwt.sign(
            {id : user._id, sessionId : session._id},
            process.env.JWT_ACCESS_SECRET as string,
            {expiresIn : "15m"} 
        )

        res.cookie("accessToken", accessToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', 
            maxAge : 15 * 60 * 1000
        })

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).json({
            success : true,
            message : "Logged in Successfully",
            user : {
                user : user.firstName,
                Email : user.email
            }
        })

    } catch (err) {
    
    console.error('Login error:', err)
    console.log(err)
    return res.status(500).json({ success: false, message: 'Internal server error' })

    }
}   


export const handleRotateToken = async (req : Request, res : Response) =>    {

    try {
        const refreshToken = req.cookies.refreshToken

        if (! refreshToken){
            return res.status(401).json({
                success : false,
                message : "Refresh Token not found"
            })
        }

        let decoded
        try {
            decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET as string) as JwtPayload
        } catch (err)   {
            return res.status(401).json({
                success : false,
                message : "Refresh Token expired or invalid"
            })
        }


        const session = await sessionModel.findById(decoded.sessionId)
        
        if (!session){
            return res.status(401).json({
                success : false,
                message : "Invalid refresh token"
            })
        }

        if (session.revoked){
            return res.status(401).json({
                success : false,
                message : "Session revoked, please login again"
            })
        }
        const incomingHash  = crypto.createHash("sha256").update(refreshToken).digest("hex")

        if (incomingHash !== session.refreshTokenHash){
            
            await sessionModel.updateMany(
                {user : decoded.id, revoked : false },
                {revoked : true}
                
            )
            console.warn(`Refresh token reuse detected: user ${decoded.id}, session ${decoded.sessionId}`)
            return res.status(401).json({
                success : false,
                message : "Session invalid, please login again"
            })
        }
        // generate acessToken
        const accessToken = jwt.sign(
            { id: decoded.id, sessionId: session._id },
            process.env.JWT_ACCESS_SECRET as string,
            {expiresIn : "15m"}
        )
        // send in cookie
        res.cookie("accessToken", accessToken, {
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge : 15 * 60 * 1000
        })

        // generate new refreshToken

        const newRefreshToken = jwt.sign(
            {id : decoded.id, sessionId : session._id},
            process.env.JWT_REFRESH_SECRET as string,
            {expiresIn : "7d"}
        )

        const NewRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex")

        res.cookie("refreshToken", newRefreshToken,{
            httpOnly : true,
            secure : process.env.NODE_ENV === "production",
            sameSite : process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge : 7 * 24 * 60 * 60 * 1000
        })

        session.refreshTokenHash = NewRefreshTokenHash
        await session.save()

        const user = await userModel.findById(decoded.id).select("-password")
        if (!user) {
            return res.status(400).json({
                success : false,
                message : "User not found"
            })
        }
        return res.status(200).json({
            success : true,
            message : "Access token refreshed successfully",
            user: {
                name: user.firstName,
                email: user.email
            }
        })

    } catch (err) {
        console.error("Refresh token error:", err)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

export const handleLogout = async (req : Request, res : Response) => {

    try {
        const refreshToken = req.cookies.refreshToken
        if (!refreshToken){
            return res.status(401).json({
                success : true,
                message : "Refresh token not found"
            })
        }
        
        const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

        const session = await sessionModel.findOne({
            refreshTokenHash,
            revoked : false
        })

        if (!session){
            return res.status(400).json({
                success : false,
                message : "Invalid Refresh token"
            })
        }

        session.revoked = true;
        await session.save()

        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
        })

        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax'
        })

        return res.status(200).json({
            success : true,
            message : "logout successfully"
        })
        
    } catch (err){
        console.log("logout error", err)
        return res.status(500).json({
            success : true,
            message : "Internal server error"
        })

    }
}


