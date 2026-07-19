import { Link } from "react-router-dom";
import "./Auth.css";

export const PasswordChangedPage = () => {
  return (
    <div className="auth-form">
      <h2>Password Changed Successfully</h2>
      <p>Your password has been reset. You can now log in with your new password.</p>

      <Link to="/login" className="authNav-link">
        Go to Login
      </Link>
    </div>
  );
};