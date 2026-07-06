import { create } from "zustand";

interface User {
  id: string;
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthReady: boolean;
  saveAccessToken: (token: string) => void;
  saveUser: (user: User) => void;
  getAccessToken: () => string | null;
  logout: () => void;
  initialize: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()((set, get) => ({
  accessToken: null,
  user: null,
  isAuthReady: false,

  saveAccessToken: (token) => set({ accessToken: token }),
  saveUser: (user) => set({ user }),
  getAccessToken: () => get().accessToken,
  logout: () => set({ accessToken: null, user: null }),

  initialize: async () => {
    try {
      const res = await fetch("/api/auth/refresh", {
        method: "POST",
        credentials: "include", 
      });

      if (res.ok) {
        const data = await res.json();
        set({ accessToken: data.accessToken, user: data.user });
      } else {
        
        set({ accessToken: null, user: null });
      }
    } catch {
      
      set({ accessToken: null, user: null });
    } finally {
      // must run either way, or App.tsx stays stuck on blank screen forever
      set({ isAuthReady: true });
    }
  },
})); 