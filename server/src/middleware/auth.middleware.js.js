import bcrypt from "bcryptjs"
import crypto from "crypto"
import jwt from 'jsonwebtoken';



export const authMiddleware = async (req, res, next) =>   {
    try {
        const token = req.headers.authorization?.split(" ")[1] 

        if (!token){
            return res.status(401).json({
                success : false,
                message : "Token not found"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.user = {userId : decoded.id}
        next()


    } catch(err) {
        console.log(err)
        return res.status(401).json({
            success: false,
            message: "Invalid Token"
        })
    }
}

