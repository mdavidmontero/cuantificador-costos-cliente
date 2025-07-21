import type { UseFormWatch } from "react-hook-form";
import type { RegistroCostosFormValues } from "../schemas";
import useCostStore from "../store/useCostStore";

export function useProductionCostCalculator(
  watch: UseFormWatch<RegistroCostosFormValues>
) {
  const cantidadFinal = watch("cantidadesFinales");
  const precioVentaUnitario = watch("costoProduccion.precioVentaUnitario");

  const costos = useCostStore.getState();

  const totalGastosMercadeo =
    costos.totalGastosAdministracion + costos.totalGastosVentas;

  const totalCostosIndirectoFabricaciones =
    costos.totalMateriaPrimaIndirecta +
    costos.totalManoObraIndirecta +
    costos.totalCostosGenerales;

  const totalCostosdeOperacion =
    totalGastosMercadeo + costos.totalGastosAdministracion;

  const totalCostosdeProduccion =
    costos.totalMateriaPrimaDirecta +
    costos.totalManoObraDirecta +
    costos.totalCostosIndirectosFabricacion +
    costos.totalCostosOperacion;

  const costoProduccionUnitario = cantidadFinal
    ? totalCostosdeProduccion / cantidadFinal
    : 0;

  const margenUtilidadUnitario = precioVentaUnitario
    ? ((precioVentaUnitario - costoProduccionUnitario) / precioVentaUnitario) *
      100
    : 0;

  return {
    totalGastosMercadeo,
    totalCostosIndirectoFabricaciones,
    totalCostosdeOperacion,
    totalCostosdeProduccion,
    costoProduccionUnitario,
    margenUtilidadUnitario,
  };
}
