import { create } from "zustand";
import type { User } from "../schemas";

interface userStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const userAuthStore = create<userStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));
