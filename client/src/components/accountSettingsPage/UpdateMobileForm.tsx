import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateMobileNumber } from "../../utils/validators";

export const UpdateMobileNumber = () => {
    const BASE_URL = import.meta.env.VITE_API_URL;
    const navigate = useNavigate()
    const [step, setStep] = useState<"start" | "verify">("start");
    const [mobileNumber, setMobileNumber] = useState("")
    const [otp, setOtp] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const handleSendOtp = async () => {
        setError("")
        setIsSubmitting(true)
        try {
            const res = await fetch(`${BASE_URL}/user/send-email-otp`, {
                method: "POST",
                credentials: "include",
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message ?? "Could not send OTP");
            }

            setStep("verify")
        } catch (err: any) {
            setError(err?.message ?? "Could not send OTP");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        const isValid = validateMobileNumber(mobileNumber)
        if (isValid) {
        setError("Please enter a valid mobile number")
        return
        }
        setError("")
        setIsSubmitting(true)

        try {
            const res = await fetch(`${BASE_URL}/user/change-mobile`, {
                method: "PATCH",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    newMobileNumber: mobileNumber,
                    otp: otp
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message ?? "Something went wrong");
            }

            navigate("/dashboard");
        } catch (err: any) {
            setError(err?.message ?? "Invalid OTP or mobile number");
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
                <h1 className="edit-title">Change mobile number</h1>

                {step === "start" && (
                    <div className="edit-form">
                        <p className="edit-hint">
                            To change your mobile number, you must first verify the OTP sent to your registered email address.
                        </p>
                        {error && <p className="edit-error">{error}</p>}
                        <button className="edit-submit-btn" onClick={handleSendOtp} disabled={isSubmitting}>
                            {isSubmitting ? "Sending…" : "Send OTP to email"}
                        </button>
                    </div>
                )}

                {step === "verify" && (
                    <form onSubmit={handleSubmit} className="edit-form">
                        <label className="edit-label">
                            New mobile number
                            <input
                                className="edit-input"
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)}
                                required
                            />
                        </label>

                        <label className="edit-label">
                            OTP (sent to your email)
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
                            {isSubmitting ? "Verifying…" : "Update mobile number"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};