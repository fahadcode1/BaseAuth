import { Link } from "react-router-dom";
import "./Auth.css";

export const RegisterSuccessPage = () => {
  return (
    <div className="auth-form auth-success">
      <div className="success-icon">✓</div>
      <h2>Registration Successful</h2>
      <p className="success-text">
        Your account has been created and verified. You can now log in.
      </p>

        <Link to="/login" className="go-login-btn">
        Go to Login
        </Link>
    </div>
  );
};