import { AuthRoutes } from "./routes/AuthRoutes"
import { AuthProvider } from "./context/AuthContext"
import { useAuthStore } from "./store/authStore"
import { useEffect, useRef  } from "react"

function App() {
  const initialize = useAuthStore(state => state.initialize)
  const isAuthReady = useAuthStore(state => state.isAuthReady)
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current) return
    initRef.current = true
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