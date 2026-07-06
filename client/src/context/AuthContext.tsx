import { createContext, useContext } from "react";
import { useAuthStore } from "../store/authStore";

type AuthContextType = {
  isLoggedIn: boolean;
  user: any;
  login: (user: any, token: string) => void;
  logout: () => void;
};

const AuthContext = createContext(null as AuthContextType | null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const user = useAuthStore(state => state.user);
  const saveUser = useAuthStore(state => state.saveUser);
  const saveAccessToken = useAuthStore(state => state.saveAccessToken);
  const storeLogout = useAuthStore(state => state.logout);

  const isLoggedIn = !!user;

  const login = (user: any, token: string) => {
    saveUser(user);
    saveAccessToken(token);
  };

  const logout = () => {
    storeLogout();
  };

  return (
    <AuthContext.Provider   value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}