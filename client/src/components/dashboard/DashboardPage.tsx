import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAuthStore } from "../../store/authStore";
import "./DashboardPage.css";

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, isLoading, error } = useCurrentUser();
  const logout = useAuthStore((state) => state.handleLogout);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  if (isLoading) {
    return (
      <div className="page-state">
        <p className="page-state-text">Loading session…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-state">
        <p className="page-state-text page-state-error">{error}</p>
      </div>
    );
  }

  if (!user) return null;

  const initial = user.firstName?.[0]?.toUpperCase() ?? "?";

  return (
    <div className="page">
      <header className="page-header">
        <div className="page-header-left">
          <div className="page-avatar">{initial}</div>
          <div>
            <p className="page-eyebrow">Signed in as</p>
            <h1 className="page-name">
              {user.firstName} {user.lastName}
            </h1>
          </div>
        </div>

        <button className="logout-btn" onClick={handleLogout} aria-label="Log out">
          <i className="ti ti-logout" />
          <span>Log out</span>
        </button>
      </header>

      <div className="page-card">
        <div className="page-card-header">
          <span className="page-card-title">Account details</span>
        </div>

        <dl className="page-info-grid">
          <div className="page-info-row">
            <dt>first_name</dt>
            <dd>{user.firstName}</dd>
          </div>
          <div className="page-info-row">
            <dt>last_name</dt>
            <dd>{user.lastName}</dd>
          </div>
          <div className="page-info-row">
            <dt>email</dt>
            <dd>{user.email}</dd>
          </div>
          <div className="page-info-row">
            <dt>mobile_number</dt>
            <dd>{user.mobileNumber}</dd>
          </div>
        </dl>
      </div>

      <div className="page-card page-card-placeholder">
        <div className="page-card-header">
          <span className="page-card-title">Manage account</span>
        </div>
        <p className="page-placeholder-text">
          Name, email, and password controls go here.
        </p>
      </div>
    </div>
  );
};