const BASE_URL = import.meta.env.VITE_API_URL;
import { create } from "zustand";


interface User {
  id: string;
  firstName : string
  lastName : string
  email: string;
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  isAuthReady: boolean;
  saveAccessToken: (token: string) => void;
  saveUser: (user: User) => void;
  getAccessToken: () => string | null;
  handleLogout: () => Promise<void>; 
  initialize: () => Promise<void>;
}
let initPromise: Promise<void> | null = null;

export const useAuthStore = create<AuthState>()((set, get) => ({
  accessToken: null,
  user: null,
  isAuthReady: false,

  saveAccessToken: (token) => set({ accessToken: token }),
  saveUser: (user) => set({ user: user }),
  getAccessToken: () => get().accessToken,  

  initialize: async () => {
  if (initPromise) return initPromise;

  initPromise = (async () => {
    try {
      const res = await fetch(`${BASE_URL}/auth/rotate-token`, {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        set({ user: data.user });
      } else {
        set({ accessToken: null, user: null });
      }
    } catch {
      set({ accessToken: null, user: null });
    } finally {
      set({ isAuthReady: true });
    }
  })();

  return initPromise;
},

  handleLogout : async () =>  {

      try {
         await fetch(`${BASE_URL}/auth/logout`,{
          method : "POST",
          credentials :"include"
        })
      } catch (error) {
        console.error("logout error", error)
      } finally {
        set({user :null, accessToken : null})
      }
  }
})); 