import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validators";
import { api } from "../../lib/api";
import "./AccountEditPage.css";


export const UpdateEmail = () => {

    const navigate = useNavigate()
    const [step, setStep] = useState<"email" | "otp">("email");
    const [newEmail, setNewEmail] = useState("")
    const [otp, setOtp] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const handleRequestChange = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        const validationError = validateEmail(newEmail)
        if (validationError) {
            setError(validationError)
            return
        }

        setIsSubmitting(true);
        try {
            await api.patch("/user/change-email", { newEmail: newEmail })
            setStep("otp")
        } catch (err: any) {
            setError(err?.message ?? "Could not start email change");
        } finally {
            setIsSubmitting(false);
        }
    }

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);
        try {
            await api.patch("/user/verify-pending-email", { otp: otp })
            navigate("/dashboard");
        } catch (err: any) {
            setError(err?.message ?? "Invalid or expired OTP");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="page">
            <div className="page-card edit-card">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <i className="ti ti-arrow-left" /> Back
                </button>
                <h1 className="edit-title">Change email</h1>

                {step === "email" && (
                    <form onSubmit={handleRequestChange} className="edit-form">
                        <label className="edit-label">
                            New email
                            <input
                                type="email"
                                className="edit-input"
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                                required
                            />
                        </label>

                        {error && <p className="edit-error">{error}</p>}

                        <button className="edit-submit-btn" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Sending…" : "Send OTP"}
                        </button>
                    </form>
                )}

                {step === "otp" && (
                    <form onSubmit={handleVerifyOtp} className="edit-form">
                        <p className="edit-hint">
                            We've sent an OTP to <strong>{newEmail}</strong>. Please enter it below to verify your email.
                        </p>
                        <label className="edit-label">
                            OTP
                            <input
                                className="edit-input"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                maxLength={6}
                                inputMode="numeric"
                                required
                            />
                        </label>

                        {error && <p className="edit-error">{error}</p>}

                        <button className="edit-submit-btn" type="submit" disabled={isSubmitting}>
                            {isSubmitting ? "Verifying…" : "Verify & update"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};