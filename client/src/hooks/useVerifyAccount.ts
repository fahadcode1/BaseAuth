import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyAccount, resendOtp } from "../services/authService";
import { useAuthStore } from "../store/authStore";




export const useVerifyAccount = () =>   {
    
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email

    const saveUser = useAuthStore((s) => s.saveUser)
    

    const [otp, setOtp] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState<string | null>(null);

    useEffect(()=> {
        if (!email){
            navigate('/register')
        }
    }, [])

    if (!email) {
    return {
        email: "", otp: "", error: null, resendMessage: null,
        handleChange, handleSubmit, isLoading: false, handleResend
    }
}
     function handleChange(value : string){
        setOtp(value)
        if (error) setError(null)
    }

    async function handleSubmit(event : React.FormEvent<HTMLFormElement>){
        event.preventDefault()

        if (!otp || otp.length < 6 ){
            setError("Enter Valid OTP")
            return
        }

        setIsLoading(true);
        setError(null)

        try {
            const result = await verifyAccount(email, otp)
            saveUser(result.user)
            
            navigate("/register-success");
        } catch (err : any) {
            setError(err.response?.data?.message || "Invalid OTP. Try again.");
        } finally {
            setIsLoading(false);
        }

    }

    async function handleResend(){
        setResendMessage(null)
        setError(null)
        setIsLoading(true) 
        try {
            await resendOtp(email)
            setResendMessage("OTP resent to your email.")
        } catch (err : any) {
            setError(err.response?.data?.message || "Failed to resend OTP.");
        } finally {
            setIsLoading(false)
        }
        
    }
    return {
        email,
        otp,
        error,
        resendMessage,
        handleChange,
        handleSubmit,
        isLoading,
        handleResend
    }
}