import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  checkAuth: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const hasToken = !!token;
      set({ isAuthenticated: hasToken });
    }
  },
}));
