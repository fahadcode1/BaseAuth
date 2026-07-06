import { useRegister } from "../../hooks/useRegister";
import { Link } from "react-router-dom";
import "./Auth.css"

export const RegisterPage = () =>   {
    const { formData, errors, serverError, isLoading, handleChange, handleSubmit } = useRegister()
        return (
        
        <form 
        className="auth-form"
        onSubmit={handleSubmit} noValidate>
            <h2>Create Account</h2>

            <div className="auth-row">
                <div>
                    <label>First Name :</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.firstName}
                        onChange={(e) => handleChange("firstName", e.target.value)}
                    />
                    {errors.firstName && <p>{errors.firstName}</p>}
                </div>
                <div>
                    <label>Last Name :</label>
                    <input
                        type="text"
                        placeholder="Name"
                        value={formData.lastName}
                        onChange={(e) => handleChange("lastName", e.target.value)}
                    />
                    {errors.lastName && <p>{errors.lastName}</p>}
                </div>
            </div>

            <div className="auth-row">
                <div>
                    <label>Email :</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                    />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <label>Mobile :</label>
                    <input
                        type="tel"
                        placeholder="Mobile Number"
                        value={formData.mobileNumber}
                        onChange={(e) => handleChange("mobileNumber", e.target.value)}
                    />
                    {errors.mobileNumber && <p>{errors.mobileNumber}</p>}
                </div>
            </div>

            <div className="auth-row">
                <div>
                    <label>Password :</label>
                    <input
                        type="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={(e) => handleChange("password", e.target.value)}
                    />
                    {errors.password && <p>{errors.password}</p>}
                </div>
                <div>
                    <label>Confirm Password :</label>
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    />
                    {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
                </div>
            </div>

            {serverError && <p>{serverError}</p>}

            <button type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Register"}
            </button>
        <label>Already a user? <Link to="/login" className="authNav-link">Login here</Link></label>
        </form>
    )
}