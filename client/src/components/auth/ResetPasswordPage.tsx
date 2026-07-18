import { useResetPassword } from "../../hooks/useResetPassword";
import { Link } from "react-router-dom";
import "./Auth.css";

export const ResetPasswordPage = () => {
  const { formData, errors, serverError, isLoading, handleChange, handleSubmit } =
    useResetPassword();

  return (
    <form className="auth-form" onSubmit={handleSubmit} noValidate>
      <h2>Reset Password</h2>

      <div className="auth-field-single">
        <label>New Password :</label>
        <input
          type="password"
          placeholder="New Password"
          value={formData.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div className="auth-field-single">
        <label>Confirm Password :</label>
        <input
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
      </div>

      {serverError && <p>{serverError}</p>}

      <button type="submit" disabled={isLoading}>
        {isLoading ? "Resetting…" : "Reset Password"}
      </button>

      <label>
        Remembered your password?{" "}
        <Link to="/login" className="authNav-link">Log In</Link>
      </label>
    </form>
  );
};