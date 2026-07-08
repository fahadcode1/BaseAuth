import type { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import "./DashboardLayout.css";

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <div className="layout">
      <section className="layout-main">{children ?? <Outlet />}</section>

      <aside className="layout-side">
        <div className="layout-side-content">
          <span className="layout-mark">◆</span>
          <h2 className="layout-heading">About BaseAuth</h2>
          <p className="layout-copy">
            A production-ready authentication boilerplate — JWT sessions
            with refresh token rotation, reuse detection, and secure
            httpOnly cookie storage baked in from day one.
          </p>
          <ul className="layout-list">
            <li>Refresh token rotation with reuse detection</li>
            <li>OTP-based email verification</li>
            <li>Secure sessions using httpOnly cookies</li>
          </ul>
        </div>
        <span className="layout-footer">© 2026 BaseAuth</span>
      </aside>
    </div>
  );
};

export default DashboardLayout;