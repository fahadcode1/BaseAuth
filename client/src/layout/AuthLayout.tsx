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
      <div className="auth-card">
        {title && <h1 className="auth-title">{title}</h1>}
        {children ?? <Outlet />}
      </div>
    </div>
  );
};

export default AuthLayout;