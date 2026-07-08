import { useState } from "react";
import { validateIdentifier, validatePassword } from "../utils/validators";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { loginUser } from "../services/authService";

interface LoginFormData {
    identifier: string
    password: string
}

type FormErrors = Partial<Record<keyof LoginFormData, string>>

export const useLogin = () => {
    const navigate = useNavigate()
    const saveUser = useAuthStore((s) => s.saveUser)
    const saveAccessToken = useAuthStore((s) => s.saveAccessToken)
    const [formData, setFormData] = useState<LoginFormData>({
        identifier: "",
        password: "",
    })

    const [errors, setErrors] = useState<FormErrors>({})
    const [serverError, setServerError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(false)

    function handleChange<K extends keyof LoginFormData>(field: K, value: LoginFormData[K]) {
        setFormData((prev) => ({ ...prev, [field]: value }))

        setErrors((prev) => {
            const updated = { ...prev }
            delete updated[field]
            return updated
        })
    }

    function validateAll() {
        const rawErrors = {
            identifier: validateIdentifier(formData.identifier),
            password: validatePassword(formData.password)
        }
        const activeErrors = Object.fromEntries(
            Object.entries(rawErrors).filter(([_, v]) => v != null)
        )
        setErrors(activeErrors)
        return Object.keys(activeErrors).length === 0
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        if (!validateAll()) return

        setIsLoading(true)
        setServerError(null)

        try {
            const isEmail = /\S+@\S+\.\S+/.test(formData.identifier)
            const payload = isEmail
                ? { email: formData.identifier, password: formData.password }
                : { mobileNumber: formData.identifier, password: formData.password }

            const result = await loginUser(payload)
            saveUser(result.user)
            saveAccessToken(result.accessToken)
            navigate("/dashboard")
        } catch (error: any) {
            const message = error?.response?.data?.message
            if (error?.response?.status === 0) {
                setServerError("No internet connection")
            } else {
                setServerError(message || "Invalid credentials. Try again.")
            }
        } finally {
            setIsLoading(false)
        }
    }
    return {
        formData,
        errors,
        serverError,
        isLoading,
        handleChange,
        handleSubmit,
    }
}