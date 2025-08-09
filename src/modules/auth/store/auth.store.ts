import { create } from "zustand";
import type { User } from "../schemas";
import { loginAction } from "../actions/login.actions";
import type { LoginFormData } from "../types";
import { checkAuthAction } from "../actions/check-auth.actions";

type AuthStatus = "authenticated" | "not-authenticated" | "checking";

type AuthState = {
  user: User | null;
  token: string | null;
  authStatus: AuthStatus;

  hasRole: (role: string) => boolean;
  hasAnyRole: (roles: string[]) => boolean;
  isAdmin: () => boolean;
  canAccessApp: () => boolean;

  // Actions
  login: (formData: LoginFormData) => Promise<boolean>;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
};

export const useAuthStore = create<AuthState>()((set, get) => ({
  user: null,
  token: null,
  authStatus: "checking",

  hasRole: (role) => {
    const roles = get().user?.roles ?? [];
    return roles.includes(role);
  },
  hasAnyRole: (rolesToCheck) => {
    const roles = get().user?.roles ?? [];
    return roles.some((r) => rolesToCheck.includes(r));
  },
  isAdmin: () => {
    const roles = get().user?.roles ?? [];
    return roles.includes("admin");
  },
  canAccessApp: () => {
    return get().hasAnyRole(["user", "admin"]);
  },
  login: async (formData: LoginFormData) => {
    try {
      const data = await loginAction(formData);
      localStorage.setItem("AUTH_TOKEN", data.token);
      set({ user: data.user, token: data.token, authStatus: "authenticated" });
      return true;
    } catch (err) {
      localStorage.removeItem("AUTH_TOKEN");
      set({ user: null, token: null, authStatus: "not-authenticated" });
      throw err;
    }
  },

  logout: () => {
    localStorage.removeItem("AUTH_TOKEN");
    set({ user: null, token: null, authStatus: "not-authenticated" });
  },

  checkAuthStatus: async () => {
    try {
      const { user, token } = await checkAuthAction();
      set({ user, token, authStatus: "authenticated" });
      return true;
    } catch {
      set({ user: null, token: null, authStatus: "not-authenticated" });
      return false;
    }
  },
}));
