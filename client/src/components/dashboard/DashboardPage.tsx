import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import { useAuthStore } from "../../store/authStore";
import "./DashboardPage.css";
import "../accountSettingsPage/AccountEditPage.css"

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
            <dt>name</dt>
            <dd>
              <span>{user.firstName} {user.lastName}</span>
              <button
                className="field-edit-btn"
                onClick={() => navigate("/dashboard/account/edit-name")}
                aria-label="Edit name"
              >
                <i className="ti ti-pencil" />
                <span>Edit Name</span>
              </button>
            </dd>
          </div>

          <div className="page-info-row">
            <dt>email</dt>
            <dd>
              <span>{user.email}</span>
              <button
                className="field-edit-btn"
                onClick={() => navigate("/dashboard/account/edit-email")}
                aria-label="Edit email"
              >
                <i className="ti ti-pencil" />
                <span>Edit Email</span>
              </button>
            </dd>
          </div>

          <div className="page-info-row">
            <dt>mobile number</dt>
            <dd>
              <span>{user.mobileNumber}</span>
              <button
                className="field-edit-btn"
                onClick={() => navigate("/dashboard/account/edit-mobile")}
                aria-label="Edit mobile number"
              >
                <i className="ti ti-pencil" />
                <span>Edit Mobile Number</span>
              </button>
            </dd>
          </div>

          <div className="page-info-row">
            <dt>password</dt>
            <dd>
              <span>••••••••</span>
              <button
                className="field-edit-btn"
                onClick={() => navigate("/dashboard/account/change-password")}
                aria-label="Change password"
              >
                <i className="ti ti-pencil" />
                <span>Edit Password</span>
              </button>
            </dd>
          </div>
          <div className="page-info-row">
            <dt>Delete Account</dt>
            <dd>
              <span>{user.firstName + " " + user.lastName}</span>
              <button
                className="field-edit-btn"
                onClick={() => navigate("/dashboard/account/delete-account")}
                aria-label="Edit mobile number"
              >
                <i className="ti ti-pencil" />
                <span>Delete Account</span>
              </button>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};


