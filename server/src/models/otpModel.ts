import mongoose, { Document, Schema, Types  } from "mongoose"

export interface IOtp extends Document {
    email : string,
    user: Types.ObjectId,
    otpHash : string,
}

const otpSchema = new Schema<IOtp>({
    email: {
        type: String,
        required: [ true, "Email is required" ]
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "User is required" ]
    },
    otpHash: {
        type: String,
        required: [ true, "OTP hash is required" ]
    }
}, {
    timestamps: true
})

const otpModel = mongoose.model<IOtp>("otps", otpSchema)

export default otpModel;