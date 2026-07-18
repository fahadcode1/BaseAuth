import { useLogin } from "../../hooks/useLogin";
import { Link } from "react-router-dom";
import "./Auth.css"

export const LoginPage = () => {
    const { formData, errors, serverError, isLoading, handleChange, handleSubmit } = useLogin()

    return (
        <form
            className="auth-form"
            onSubmit={handleSubmit} noValidate>
            <h2>Log In</h2>

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

            <div className="auth-field-single">
                <label>Password :</label>
                <input
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                />
                {errors.password && <p>{errors.password}</p>}
            </div>

            {serverError && <p>{serverError}</p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
            </button>
            <label>New here? <Link to="/register" className="authNav-link">Create an account</Link></label>
            <label>
            <Link to="/forgot-password" className="authNav-link">Forgot Password?</Link>
            </label>
        </form>
    )
}