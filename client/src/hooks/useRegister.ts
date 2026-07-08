import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateFirstName, 
         validateLastName, 
         validateEmail, validatePassword, validateConfirmPassword,
         validateMobileNumber} from "../utils/validators";
import { registerUser } from "../services/authService"; 



interface RegisterFormData {
    firstName: string
    lastName: string
    email: string
    mobileNumber: string
    password: string
    confirmPassword: string
}
type FormErrors = Partial<Record<keyof RegisterFormData, string>>


export const useRegister = ()  =>  {

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        mobileNumber : "",
        password : "",
        confirmPassword : ""
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [serverError, setServerError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsuccess] = useState(false)


    function handleChange<K extends keyof RegisterFormData>(
        field: K,
        value: RegisterFormData[K]
    ) {
        setFormData((prev) => ({ ...prev, [field]: value }))
        setErrors((prev) => {
            const updated = { ...prev }
            delete updated[field]  
            return updated
        })
    }

    function validateALl(){
        const rawErrors = {
            firstName : validateFirstName(formData.firstName),
            lastName : validateLastName(formData.lastName),
            email : validateEmail(formData.email),
            mobileNumber : validateMobileNumber(formData.mobileNumber),
            password : validatePassword(formData.password),
            confirmPassword : validateConfirmPassword(
            formData.password, 
            formData.confirmPassword)
        };
        console.log(rawErrors)

        const activeErrors = Object.fromEntries(
        Object.entries(rawErrors).filter(([_, v]) => v != null)
    )

        setErrors(activeErrors)
        return Object.keys(activeErrors).length === 0
    }

    async function handleSubmit(event : React.FormEvent<HTMLFormElement>){
        console.log('SUBMIT FIRED')
        event.preventDefault()
        console.log('Beofore Validation')
        if (!validateALl()) return
        setIsLoading(true)
        setErrors({})
        
        try {
            const result = await registerUser({
                firstName : formData.firstName,
                lastName : formData.lastName,
                email : formData.email,
                mobileNumber : formData.mobileNumber,
                password : formData.password
            })
            setIsuccess(true)
            navigate("/verify-account", {state : {email : formData.email}})
            console.log(result)
        } catch (error: any) {
    const data = error?.response?.data;
    if (data?.redirectTo === '/verify-email') {
        navigate("/verify-account", { state: { email: data.email ?? formData.email } })
        return
    }
    const message = data?.message;
    if (message === "EMAIL_TAKEN") {
        setErrors((prev) => ({ ...prev, email: "This email is already registered" }));
    } else if (error?.response?.status === 0) {
        setServerError("No internet connection");
    } else {
        setServerError(message || "Something went wrong. Try again.");
    }
    } finally {
      setIsLoading(false); // always runs  success or fail
    }
  }
        return {
        formData,
        errors,
        serverError,
        isLoading,
        isSuccess,
        handleChange,
        handleSubmit,
        }
     
  }