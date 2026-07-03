import { create } from "zustand";

interface AuthStore {
  user: any;
  accessToken: string | null;
  refreshToken: string | null;

  setAuth: (
    user: any,
    accessToken: string,
    refreshToken: string
  ) => void;

  logout: () => void;
}

export const useAuthStore =
  create<AuthStore>((set) => ({
    user: null,
    accessToken: null,
    refreshToken: null,

    setAuth: (user, accessToken, refreshToken) => {
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      set({
        user,
        accessToken,
        refreshToken,
      });
    },

    logout: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      set({
        user: null,
        accessToken: null,
        refreshToken: null,
      });
    },
  }));