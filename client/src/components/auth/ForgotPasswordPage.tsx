import { useForgotPassword } from "../../hooks/useForgotPassword";
import { Link } from "react-router-dom";
import "./Auth.css";

export const ForgotPasswordPage = () => {
  const { formData, errors, serverError, isLoading, isSent, handleChange, handleSubmit } =
    useForgotPassword();

  if (isSent) {
    return (
      <div className="auth-form">
        <h2>Check your email</h2>
        <p>
          An account with this email exists, we've sent a password reset link to the registered email address. The link is valid for 15 minutes.
        </p>
        <label>
          <Link to="/login" className="authNav-link">Back to Log In</Link>
        </label>
      </div>
    );
  }

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h2>Forgot Password</h2>

      <div className="auth-field-single">
        <label>Email or Mobile :</label>
        <input
          type="text"
          placeholder="Email or Mobile Number"
          value={formData.identifier}
          onChange={(e) => handleChange("identifier", e.target.value)}
        />
        {errors.identifier && <p>{errors.identifier}</p>}
      </div>

      {serverError && <p>{serverError}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Sending…" : "Send Reset Link"}
      </button>

      <label>
        Remembered your password?{" "}
        <Link to="/login" className="authNav-link">Log In</Link>
      </label>
    </form>
  );
};