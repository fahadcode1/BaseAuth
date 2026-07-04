import { AuthRoutes } from "./routes/AuthRoutes"
import { AuthProvider } from "./context/AuthContext"
import { useAuthStore } from "./store/authStore"
import { useEffect } from "react"

function App() {
  const initialize = useAuthStore(state => state.initialize)
  const isAuthReady = useAuthStore(state => state.isAuthReady)

  useEffect(() => {
    initialize()
  }, [])

  if (!isAuthReady) return null

  return (
    <AuthProvider>
      <AuthRoutes />
    </AuthProvider>
  )
}

export default App