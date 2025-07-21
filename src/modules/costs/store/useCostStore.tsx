import { create } from "zustand";

interface CostStore {
  totalMateriaPrimaDirecta: number;
  totalManoObraDirecta: number;
  totalMateriaPrimaIndirecta: number;
  totalManoObraIndirecta: number;
  totalCostosGenerales: number;
  totalGastosAdministracion: number;

  totalGastosVentas: number;
  totalCostosIndirectosFabricacion: number;
  totalgastosMercadeo: number;
  totalCostosOperacion: number;
  totalGastosProduccion: number;
  totalCostoProduccionUnitario: number;
  precioVentaUnitario: number;
  margenUtilidadUnitario: number;

  setTotalMateriaPrimaDirecta: (value: number) => void;
  setTotalManoObraDirecta: (value: number) => void;
  setTotalMateriaPrimaIndirecta: (value: number) => void;
  setTotalManoObraIndirecta: (value: number) => void;
  setTotalCostosGenerales: (value: number) => void;
  setTotalGastosAdministracion: (value: number) => void;
  setTotalGastosVentas: (value: number) => void;
  setTotalCostosIndirectosFabricacion: (value: number) => void;
  setTotalgastosMercadeo: (value: number) => void;
  setTotalCostosOperacion: (value: number) => void;
  setTotalGastosProduccion: (value: number) => void;
  setTotalCostoProduccionUnitario: (value: number) => void;
  setPrecioVentaUnitario: (value: number) => void;
  setMargenUtilidadUnitario: (value: number) => void;
}

const useCostStore = create<CostStore>()((set) => ({
  totalMateriaPrimaDirecta: 0,
  totalManoObraDirecta: 0,
  totalMateriaPrimaIndirecta: 0,
  totalManoObraIndirecta: 0,
  totalCostosGenerales: 0,
  totalGastosAdministracion: 0,
  totalGastosVentas: 0,
  totalCostosIndirectosFabricacion: 0,
  totalgastosMercadeo: 0,
  totalCostosOperacion: 0,
  totalGastosProduccion: 0,
  totalCostoProduccionUnitario: 0,
  precioVentaUnitario: 0,
  margenUtilidadUnitario: 0,

  setTotalMateriaPrimaDirecta: (totalMateriaPrimaDirecta: number) =>
    set({ totalMateriaPrimaDirecta }),
  setTotalManoObraDirecta: (totalManoObraDirecta: number) =>
    set({ totalManoObraDirecta }),
  setTotalMateriaPrimaIndirecta: (totalMateriaPrimaIndirecta: number) =>
    set({ totalMateriaPrimaIndirecta }),
  setTotalManoObraIndirecta: (totalManoObraIndirecta: number) =>
    set({ totalManoObraIndirecta }),
  setTotalCostosGenerales: (totalCostosGenerales: number) =>
    set({ totalCostosGenerales }),
  setTotalGastosAdministracion: (totalGastosAdministracion: number) =>
    set({ totalGastosAdministracion }),
  setTotalGastosVentas: (totalGastosVentas: number) =>
    set({ totalGastosVentas }),
  setTotalCostosIndirectosFabricacion: (
    totalCostosIndirectosFabricacion: number
  ) => set({ totalCostosIndirectosFabricacion }),
  setTotalgastosMercadeo: (totalgastosMercadeo: number) =>
    set({ totalgastosMercadeo }),
  setTotalCostosOperacion: (totalCostosOperacion: number) =>
    set({ totalCostosOperacion }),
  setTotalGastosProduccion: (totalGastosProduccion: number) =>
    set({ totalGastosProduccion }),
  setTotalCostoProduccionUnitario: (totalCostoProduccionUnitario: number) =>
    set({ totalCostoProduccionUnitario }),
  setPrecioVentaUnitario: (precioVentaUnitario: number) =>
    set({ precioVentaUnitario }),
  setMargenUtilidadUnitario: (margenUtilidadUnitario: number) =>
    set({ margenUtilidadUnitario }),
}));

export default useCostStore;
