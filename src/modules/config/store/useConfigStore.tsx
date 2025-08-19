import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConfigStore {
  salarioMinimoLegal: number;
  setSalarioMinimoLegal: (value: number) => void;
}

const useConfigStore = create<ConfigStore>()(persist(
  (set) => ({
    salarioMinimoLegal: 1160000, // Valor por defecto
    setSalarioMinimoLegal: (salarioMinimoLegal: number) =>
      set({ salarioMinimoLegal }),
  }),
  {
    name: "config-storage", // Nombre para localStorage
  }
));

export default useConfigStore;