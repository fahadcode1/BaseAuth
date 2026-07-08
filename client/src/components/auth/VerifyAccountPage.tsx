import { useVerifyAccount } from "../../hooks/useVerifyAccount";
import "./Auth.css"

export const VerifyAccountPage = () => {
    const hookData = useVerifyAccount();
    if (!hookData) return null;

    const {
        email,
        otp,
        error,
        isLoading,
        resendMessage,
        handleChange,
        handleSubmit,
        handleResend,
    } = hookData;

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit}
            noValidate>
            <h2>Verify Email</h2>

            <p>OTP sent to <strong>{email}</strong></p>

            <div className="auth-row">
                <div>
                    <label>Enter OTP :</label>
                    <input
                        type="tel"
                        placeholder="Enter OTP"
                        value={otp}
                        maxLength={6}
                        onChange={(e) => handleChange(e.target.value)}
                    />
                    {error && <p>{error}</p>}
                </div>
            </div>

            {resendMessage && <p>{resendMessage}</p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Verifying..." : "Verify"}
            </button>
            <button className="reset-otp-btn" type="button" onClick={handleResend}>
                Resend OTP
            </button>
        </form>
    )
}