import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  firstName: string
  lastName: string
  email: string
  pendingEmail?: string | undefined
  isVerifiedPendingEmail : boolean
  isVerifiedEmail: boolean
  mobileNumber?: string
  isVerifiedMobileNumber: boolean
  password: string
  role: "user" | "moderator" | "admin" | "leadAdmin" | "manager"
  emailOtp?: string | undefined
  emailOtpExpiry?: Date | undefined
  mobileNumberOtp?: string | undefined
  mobileNumberOtpExpiry?: Date | undefined
  resetPasswordToken?: string | undefined
  resetPasswordExpiresAt?: Date
}

const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    pendingEmail: { type: String, default: null },
    isVerifiedPendingEmail : { type: Boolean, default: false },
    isVerifiedEmail: { type: Boolean, default: false },
    mobileNumber: { type: String, unique: true, required: false, sparse: true },
    isVerifiedMobileNumber: { type: Boolean, default: false },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    role: {
      type: String,
      enum: ["user", "moderator", "admin", "leadAdmin", "manager"],
      default: "user",
    },
    emailOtp: { type: String },
    emailOtpExpiry: { type: Date },
    mobileNumberOtp: { type: String },
    mobileNumberOtpExpiry: { type: Date },
    resetPasswordToken: { type: String },
    resetPasswordExpiresAt: { type: Date },
  },
  { timestamps: true }
)

const userModel = mongoose.model<IUser>("user", userSchema)

export default userModel