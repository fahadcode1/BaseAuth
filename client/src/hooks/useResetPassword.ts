import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../lib/api";

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

export const useResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [formData, setFormData] = useState<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<ResetPasswordForm>>({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: keyof ResetPasswordForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validate = () => {
    const newErrors: Partial<ResetPasswordForm> = {};
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError("");

    if (!token) {
      setServerError("Reset link is invalid or missing a token");
      return;
    }
    if (!validate()) return;

    setIsLoading(true);
    try {
      await api.post(`/auth/reset-password?token=${token}`, {
        password: formData.password,
      });
      navigate("/login");
    } catch (err: any) {
      setServerError(err.response?.data?.message ?? "Invalid or expired token");
    } finally {
      setIsLoading(false);
    }
  };

  return { formData, errors, serverError, isLoading, handleChange, handleSubmit };
};