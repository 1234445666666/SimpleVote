import { create } from "zustand";
import { toast } from "react-toastify";

interface AuthState {
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true,
}));
