import { Request, Response, NextFunction } from "express";
import config from '../config/config'
import jwt from 'jsonwebtoken';
import { JwtPayload } from "jsonwebtoken"



export const authMiddleware = async (req : Request, res : Response, next:NextFunction) =>   {
    try {
        const token = req.cookies?.accessToken

        if (!token){
            return res.status(401).json({
                success : false,
                message : "Token not found"
            })
        }
        const decoded = jwt.verify(token, config.jwtAccessSecret as string) as JwtPayload
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

