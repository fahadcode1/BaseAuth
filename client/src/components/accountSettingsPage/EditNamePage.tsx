import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";

import "./AccountEditPage.css"


export const EditNamePage = () =>   {
const BASE_URL = import.meta.env.VITE_API_URL;
const navigate = useNavigate()

const {user} =  useCurrentUser()


const [firstName, setFirstName] = useState(user?.firstName ?? "")
const [lastName, setLastName] = useState(user?.lastName ?? "")
const [isSubmitting, setIsSubmitting] = useState(false)
const [error, setError] = useState("")


// FUNCTION handleSubmit(event)

const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault() 
        setError("")
        setIsSubmitting(true)

    try {
        const res = await fetch(`${BASE_URL}/user/change-name`,{
            method : "PATCH",
            credentials : "include",
            headers : {"Content-Type": "application/json" }, 
            body : JSON.stringify({
                 newFirstName: firstName,
                 newLastName: lastName    
            })
        })
        navigate("/dashboard")
        if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Something went wrong");
        }
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Could not update name");
    } finally {
      setIsSubmitting(false);
    }

}
return (
    <div className="page">
      <div className="page-card edit-card">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <i className="ti ti-arrow-left" /> Back
        </button>
        <h1 className="edit-title">Edit name</h1>

        <form onSubmit={handleSubmit} className="edit-form">
          <label className="edit-label">
            First name
            <input
              className="edit-input"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>

          <label className="edit-label">
            Last name
            <input
              className="edit-input"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>

          {error && <p className="edit-error">{error}</p>}

          <button className="edit-submit-btn" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Save changes"}
          </button>
        </form>
      </div>
    </div>
  );

}