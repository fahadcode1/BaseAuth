import userModel from "../models/userModel.js"
import jwt from 'jsonwebtoken'


export const handleGetMe = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        const user = await userModel.findById(decoded.id)

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

export const handleChangeEmail = async (req, res) => {
    
    try {
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
        user.email = newEmail;
        await user.save()

        return res.status(200).json({
            success : true,
            message : "Email changed successfully"
        })

    } catch (err){
        console.error('changeEmail error:', err)
        return res.status(500).json({
            success : false,
            message : "Internal server error"
        })
        
    }

}

export const handleChangeName = async (req, res) =>    {
    
}

export const handleChangeMobileNumber = async (req, res) => {

    //logic
}

export const handleDeleteAccount = async (req, res) =>  {

    //logic
}