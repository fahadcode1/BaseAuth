export const validateFirstName = (firstName : string) => {
    if (!firstName){
        return "Name can not be empty"
    }
    return null
}

export const validateLastName = (lastName : string) => {
    if (!lastName){
        return "Name can not be empty"
    }
    return null
}

export const validateEmail = (email : string) =>    {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email){
        return "Email is required"
    }
    if (!regex.test(email)){
        return "Ivalid Email"
    }

    return null
}

export const validateMobileNumber = (mobileNumber : string) =>   {
    const mobileRegex = /^[6-9]\d{9}$/;

    if  (!mobileNumber){
        return "Mobile Number can not be empty"
    }

    if (!mobileRegex.test(mobileNumber)){
        return "Invalid Mobile Number"
    }
    return null
}

export const validatePassword = (password : string) =>   {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (!password){
        return "Password is required"
    }

    if (!passwordRegex.test(password)){
        return "Password must be at least 8 characters and contain an uppercase letter, number, and special character"
    }

    return null
}

export const validateConfirmPassword = (password : string, confirmPassword : string) => {

    if (password !== confirmPassword){
        return "Password don't match"
    }
    return null
}

export function validateIdentifier(value: string): string | null {
    const trimmed = value.trim()

    if (!trimmed) {
        return "Email or mobile number is required"
    }

    const isEmail = /\S+@\S+\.\S+/.test(trimmed)
    const isMobile = /^[6-9]\d{9}$/.test(trimmed)

    if (!isEmail && !isMobile) {
        return "Enter a valid email or 10-digit mobile number"
    }

    return null
}

