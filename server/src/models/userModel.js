import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

    firstName : {
            type : String,
            required : true
    },
    lastName : {
        type : String,
        required : true
        
    },
    email : {
        required: [true, "email is required"],
        type : String,
        unique: true,
        lowercase : true,
        trim : true

    },

    isVerifiedEmail : {
        type : Boolean,
        default :false
    },

    mobileNumber : {    
            type : String,
            unique : true,
            required: false,
            sparse: true
    },

    isVerifiedMobileNumber : {
        type : Boolean,
        default :false
    },
    password : {
        type : String,
        required : [true, "password is required"],
        minlength : [8, "Password must be at least 8 characters long"]
    },

    role : {
        type : String,
        enum: ["user", "moderator", "admin", "leadAdmin", "manager"],
        default : "user"
    },
    
    emailOtp : {  type : String },
    emailOtpExpiry : {type : Date },

    mobileNumberOtp : {type : String},
    mobileNumberOtpExpiry : {type : Date },
    resetPasswordToken: String,
	resetPasswordExpiresAt: Date,
},
    {timestamps : true}
)

const userModel = mongoose.model("user",userSchema)

export default userModel