import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: localStorage.getItem("token") || null,
  login: (user) => {
    localStorage.setItem("token", user.token);
    set({ token: user.token });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null });
  },
}));

export default useAuthStore;
