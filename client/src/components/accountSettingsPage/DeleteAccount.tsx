import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../lib/api";
import "./AccountEditPage.css";

export const DeleteAccount = () => {
    const navigate = useNavigate()
    const [step, setStep] = useState<"warning" | "confirm">("warning")
    const [confirmText, setConfirmText] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState("")

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")

        if (confirmText.trim().toUpperCase() !== "DELETE") {
            setError('Please type "DELETE" to confirm')
            return
        }

        setIsSubmitting(true)
        navigate("/login");
        try {
            await api.delete("/user/delete-account")
            navigate("/login")
        } catch (err: any) {
            setError(err?.message ?? "Could not delete account")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="page">
            <div className="page-card edit-card">
                <button className="back-btn" onClick={() => navigate(-1)}>
                    <i className="ti ti-arrow-left" /> Back
                </button>
                <h1 className="edit-title">Delete account</h1>

                {step === "warning" && (
                    <div className="edit-form">
                        <p className="edit-hint">
                            Your account and all associated data will be permanently deleted. This action cannot be undone.

                        </p>
                        {error && <p className="edit-error">{error}</p>}
                        <button
                            className="edit-submit-btn"
                            onClick={() => setStep("confirm")}
                        >
                            Delete my account
                        </button>
                    </div>
                )}

                {step === "confirm" && (
                    <form onSubmit={handleDelete} className="edit-form">
                        <p className="edit-hint">
                            To confirm, type <strong>DELETE</strong> below.
                        </p>
                        <label className="edit-label">
                            Type DELETE
                            <input
                                className="edit-input"
                                value={confirmText}
                                onChange={(e) => setConfirmText(e.target.value)}
                                required
                            />
                        </label>

                        {error && <p className="edit-error">{error}</p>}

                        <button
                            className="edit-submit-btn"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Deleting…" : "Yes, delete my account"}
                        </button>

                        <button
                            type="button"
                            className="back-btn"
                            onClick={() => setStep("warning")}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};