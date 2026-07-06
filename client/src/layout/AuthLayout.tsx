import type { ReactNode } from "react";
import "./AuthLayout.css";
import { Outlet } from "react-router-dom";

interface AuthLayoutProps {
  title?: string;       // optional — not every nested page needs the layout to set it
  children?: ReactNode; // optional — if not passed, we render <Outlet /> instead
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <div className="auth-layout">
      <aside className="auth-panel-brand">
        <div className="auth-brand-glow" aria-hidden="true" />
        <div className="auth-brand-content">
          <span className="auth-brand-mark">◆</span>
          <h2 className="auth-brand-heading">Authentication, ready from day one.</h2>
          <p className="auth-brand-copy">
             Drop BaseAuth into any project and get a production-ready authentication
             system without rebuilding the basics.
          </p>
          <ul className="auth-brand-list">
            <li>Login, register, and password reset included</li>
            <li>JWT authentication with refresh token rotation</li>
            <li>Secure sessions using httpOnly cookies</li>
          </ul>
        </div>
        <span className="auth-brand-footer">© 2026 BaseAuth</span>
      </aside>

      <section className="auth-panel-form">
        <div className="auth-form-wrap">
          <span className="auth-brand">BaseAuth</span>
          {title && <h1 className="auth-title">{title}</h1>}
          {children ?? <Outlet />}
        </div>
      </section>
    </div>
  );
};

export default AuthLayout;