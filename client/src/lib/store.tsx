import { create } from "zustand";
import { toast } from "react-toastify";

interface AuthState {
  users: { username: string; password: string }[];
  currentUser: string | null;
  isAuthenticated: boolean;
  register: (username: string, password: string) => void;
  login: (username: string, password: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  users: JSON.parse(localStorage.getItem("users") || "[]"),
  currentUser: localStorage.getItem("currentUser"),
  isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
  register: (username: string, password: string) => {
    set((state) => {
      const users = [...state.users, { username, password }];
      localStorage.setItem("users", JSON.stringify(users));
      return { users };
    });
  },
  login: (username: string, password: string) => {
    set((state) => {
      localStorage.setItem("currentUser", username);
      localStorage.setItem("isAuthenticated", "true");
      toast("Вы успешно вошли");
      return {
        currentUser: username,
        isAuthenticated: true,
        users: state.users,
      };
    });
  },
}));
