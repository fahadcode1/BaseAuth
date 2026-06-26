import bcrypt from "bcryptjs"

export const verifyEmailOTP = async (req, res, next) => {
    try {
        const otp = req.body.otp
        const userId = req.user.userId

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

        if (user.emailOtpExpiry < Date.now()) {
            return res.status(400).json({
                success : false,
                message : "OTP expired"
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