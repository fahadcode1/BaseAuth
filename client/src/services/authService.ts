const BASE_URL = import.meta.env.VITE_API_URL;

interface RegisterPayload {
    firstName: string
    lastName: string
    email: string
    mobileNumber : string
    password: string
}

export const registerUser = async (userData: RegisterPayload) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        const data = await response.json(); // pehle hamesha body parse karo

        if (!response.ok) {
            throw { response: { data, status: response.status } };
        }

        return data;

    } catch (error: any) {
        if (error.response) throw error; // already structured hai, aage bhej do
        throw { response: { data: { message: "Network error" }, status: 0 } };
    }
}


export const verifyAccount = async (email : string, otp :string) =>    {
    try {
        const response = await fetch(`${BASE_URL}/auth/verify-account`,{
            method : "POST",
            headers : {"Content-Type" : "application/json"},
            credentials : "include",
            body : JSON.stringify({email, otp})
        })
        if (!response.ok){
            const error = await response.json();
            throw { response: { data: error, status: response.status } };
        }

        return response.json();
    } catch (error){
        throw error;
    }
}

export const resendOtp = async (email : string) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/resend-otp`,{
            method : "POST",
            headers: { "Content-Type": "application/json" },
            credentials : "include",
            body : JSON.stringify({email})
        })
        if (!response.ok){
            const error = await response.json();
            throw { response: { data: error, status: response.status } };
        }

        return await response.json()
    } catch(error){
        throw error
    }
}


interface LoginPayload {
    email?: string
    mobileNumber?: string
    password: string
}

export const loginUser = async (credentials: LoginPayload) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
            throw { response: { data, status: response.status } };
        }

        return data;

    } catch (error: any) {
        if (error.response) throw error;
        throw { response: { data: { message: "Network error" }, status: 0 } };
    }
}

export interface CurrentUser {
    firstName: string
    lastName: string
    email: string
    mobileNumber: string
}

export const getMe = async (): Promise<{ success: boolean; user: CurrentUser }> => {
    try {
        const response = await fetch(`${BASE_URL}/user/get-me`, {
            method: "GET",
            credentials: "include",
        });

        const data = await response.json();

        if (!response.ok) {
            throw { response: { data, status: response.status } };
        }

        return data;

    } catch (error: any) {
        if (error.response) throw error;
        throw { response: { data: { message: "Network error" }, status: 0 } };
    }
}

