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
        type : String,
        unique : [true,"email is required"],
        lowercase : true,
        trim : true

    },

    isVerified : {
        type : Boolean,
        default :false
    },

    mobileNumber : {    
            type : String,
            unique : true
    },

    password : {
        type : String,
        required : [true, "password is required"],
        minlength : [8, "Password must be at least 6 characters long"]
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