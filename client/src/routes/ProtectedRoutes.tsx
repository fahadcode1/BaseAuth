import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useAuthStore } from "../store/authStore.js"

export function ProtectedRoute() {
  const user = useAuthStore((s) => s.user)
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  return <Outlet />
}
