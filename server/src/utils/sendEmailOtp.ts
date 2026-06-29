import crypto from "crypto";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
import { IUser } from "../models/userModel.js"

// generate 6 digit otp
const generateOtp = () => {
    return crypto.randomInt(100000, 1000000).toString();
};

export const sendEmailVerificationOtp = async (user: IUser) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASS,
        },
    });

    const otp = generateOtp();

    const hashedOtp = await bcrypt.hash(otp, 10);

    user.emailOtp = hashedOtp;
    user.emailOtpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    await transporter.sendMail({
        from: `"Your App Name" <${process.env.GMAIL_USER}>`,
        to: user.email,
        subject: "Your Verification OTP",
        text: `Your OTP is ${otp}. Valid for 10 minutes. Do not share it with anyone.`,
    });
};