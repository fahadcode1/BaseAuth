import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateConfirmPassword, validatePassword } from "../../utils/validators";
import "./AccountEditPage.css";
import { api } from "../../lib/api";

export const ChangePassword = () => {

const navigate = useNavigate()
const [oldPassword, setOldPassword] = useState("")
const [newPassword, setNewPassword] = useState("")
const [confirmPassword, setConfirmPassword] = useState("")
const [isSubmitting, setIsSubmitting] = useState(false)
const [error, setError] = useState("")


function validateAll(){
    const rawErrors = {
        oldPassword : validatePassword(oldPassword),
        newPassword : validatePassword(newPassword),
        confirmPassword : validateConfirmPassword(newPassword,confirmPassword)
    }
const activeErrors = Object.fromEntries(
      Object.entries(rawErrors).filter(([_, v]) => v != null)
    );

    if (Object.keys(activeErrors).length > 0) {
      
      const firstMessage = Object.values(activeErrors)[0];
      setError(firstMessage as string);
      return false;
    }

    return true;
  }

 const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("")
    if (!validateAll()) return
    setIsSubmitting(true)
    try {
      await api.patch("/user/change-password",{
                oldPassword : oldPassword,
                newPassword : newPassword
            })
      navigate("/dashboard");
    } catch (err: any) {
      setError(err?.message ?? "Could not update name");
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
        <h1 className="edit-title">Change password</h1>

        <form onSubmit={handleSubmit} className="edit-form">
          <label className="edit-label">
            Current password
            <input
              type="password"
              className="edit-input"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </label>

          <label className="edit-label">
            New password
            <input
              type="password"
              className="edit-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </label>

          <label className="edit-label">
            Confirm new password
            <input
              type="password"
              className="edit-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>

          {error && <p className="edit-error">{error}</p>}

          <button className="edit-submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Updating…" : "Update password"}
          </button>
        </form>
      </div>
    </div>
  );
}