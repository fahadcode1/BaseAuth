import { useState } from "react";
import { api } from "../lib/api";

interface ForgotPasswordForm {
  identifier: string;
}

export const useForgotPassword = () => {
  const [formData, setFormData] = useState<ForgotPasswordForm>({ identifier: "" });
  const [errors, setErrors] = useState<Partial<ForgotPasswordForm>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleChange = (field: keyof ForgotPasswordForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<ForgotPasswordForm> = {};
    if (!formData.identifier.trim()) {
      newErrors.identifier = "Email or mobile number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!validate()) return;

    const isEmail = formData.identifier.includes("@");

    setIsLoading(true);
    try {
      await api.post("/auth/forgot-password", {
        email: isEmail ? formData.identifier : undefined,
        mobileNumber: !isEmail ? formData.identifier : undefined,
      });
      setIsSent(true);
    } catch (err: any) {
      setServerError(err.response?.data?.message ?? "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, errors, serverError, isLoading, isSent, handleChange, handleSubmit };
};