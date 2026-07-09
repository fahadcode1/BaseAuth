import { Navigate, Outlet } from "react-router-dom"
import { useAuthStore } from "../store/authStore"

export function PublicRoute() {
  const user = useAuthStore((s) => s.user)
  const isAuthReady = useAuthStore((s) => s.isAuthReady)

 
  if (!isAuthReady) return null
  
  if (user) {
    return <Navigate to="/dashboard" replace />
  }
  return <Outlet />
}