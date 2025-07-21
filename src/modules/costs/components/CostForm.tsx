import {
  type Control,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import type { RegistroCostosFormValues } from "../schemas";
import MateriaPrimaDirectaForm from "./MateriaPrimaDirectaForm";
import ManoObraDirectaForm from "./ManoObraDirectaForm";
import CostosIndirectosFabricacionForm from "./CostosIndirectosFabricacionForm";
import ManoObraIndirectaForm from "./ManoObraIndirectaForm";
import CostosGeneralesForm from "./CostosGeneralesForm";
import CostosOperacionForm from "./CostosOperacionForm";
import GastoVentasForm from "./GastoVentasForm";
import useCostStore from "../store/useCostStore";
import { useEffect, useMemo } from "react";
import ConsolidadoCostos from "./ConsolidadoCostos";
import SearchSelectForm from "@/components/shared/search/SearchShared";
import { useQuery } from "@tanstack/react-query";
import { getMateriaPrimas } from "@/modules/material/actions/get-materials.actions";
import type { SchemaMaterialList } from "@/modules/material/schemas";

export interface Props {
  control: Control<RegistroCostosFormValues>;
  register: UseFormRegister<RegistroCostosFormValues>;
  watch: UseFormWatch<RegistroCostosFormValues>;
}

export default function CostForm({ register, control, watch }: Props) {
  const cantidadFinal = watch("cantidadesFinales");
  const precioVentaUnitario = watch("costoProduccion.precioVentaUnitario");
  const { data: productos } = useQuery({
    queryKey: ["getProductos"],
    queryFn: getMateriaPrimas,
  });

  const {
    totalGastosVentas,
    totalGastosAdministracion,
    totalMateriaPrimaDirecta,
    totalManoObraDirecta,
    totalManoObraIndirecta,
    totalMateriaPrimaIndirecta,
    totalCostosGenerales,
    totalCostosOperacion,
    totalCostosIndirectosFabricacion,
    setTotalCostosIndirectosFabricacion,
    setTotalgastosMercadeo,
    setTotalCostosOperacion,
    setTotalGastosProduccion,
    setMargenUtilidadUnitario,
    setTotalCostoProduccionUnitario,
  } = useCostStore();

  const totalGastosMercadeo = useMemo(
    () => totalGastosAdministracion + totalGastosVentas,
    [totalGastosVentas, totalGastosAdministracion]
  );

  const totalCostosIndirectoFabricaciones = useMemo(
    () =>
      totalMateriaPrimaIndirecta +
      totalManoObraIndirecta +
      totalCostosGenerales,
    [totalMateriaPrimaIndirecta, totalManoObraIndirecta, totalCostosGenerales]
  );

  const totalCostosdeOperacion = useMemo(
    () => totalGastosAdministracion + totalGastosMercadeo,
    [totalGastosMercadeo, totalGastosAdministracion]
  );

  const totalCostosdeProduccion = useMemo(
    () =>
      totalMateriaPrimaDirecta +
      totalManoObraDirecta +
      totalCostosIndirectosFabricacion +
      totalCostosOperacion,
    [
      totalMateriaPrimaDirecta,
      totalManoObraDirecta,
      totalCostosIndirectosFabricacion,
      totalCostosOperacion,
    ]
  );

  const costoProduccionUnitario = useMemo(
    () => (cantidadFinal ? totalCostosdeProduccion / cantidadFinal : 0),
    [totalCostosdeProduccion, cantidadFinal]
  );

  const margenUtilidadUnitario = useMemo(
    () =>
      precioVentaUnitario
        ? ((precioVentaUnitario - costoProduccionUnitario) /
            precioVentaUnitario) *
          100
        : 0,
    [precioVentaUnitario, costoProduccionUnitario]
  );

  useEffect(() => {
    setTotalgastosMercadeo(totalGastosMercadeo);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalGastosMercadeo]);

  useEffect(() => {
    setTotalCostosIndirectosFabricacion(totalCostosIndirectoFabricaciones);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCostosIndirectoFabricaciones]);

  useEffect(() => {
    setTotalCostosOperacion(totalCostosdeOperacion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCostosdeOperacion]);

  useEffect(() => {
    setTotalGastosProduccion(totalCostosdeProduccion);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCostosdeProduccion]);
  useEffect(() => {
    setMargenUtilidadUnitario(margenUtilidadUnitario);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [margenUtilidadUnitario]);

  useEffect(() => {
    setTotalCostoProduccionUnitario(costoProduccionUnitario);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [costoProduccionUnitario]);
  const options =
    productos?.map((item: SchemaMaterialList) => ({
      label: item.nombre,
      value: item.id.toString(),
    })) ?? [];

  return (
    <>
      <section className="mb-6 ">
        <h2 className="text-xl font-bold text-gray-800  border-gray-200 pb-2">
          Datos Generales del Producto
        </h2>
        <div className="space-y-3 mb-5">
          <label
            htmlFor="productoId"
            className="text-sm font-semibold uppercase"
          >
            ID del Producto
          </label>
          <SearchSelectForm
            name={"productoId"}
            control={control}
            options={options}
            placeholder="Producto"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-semibold uppercase">
              Cant. Producidas
            </label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border border-gray-300"
              placeholder="Cantidad"
              {...register("cantidadProducida", {
                valueAsNumber: true,
                required: "Este campo es obligatorio",
                min: { value: 0, message: "Debe ser mayor o igual a 0" },
              })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold uppercase">
              Unidad de Medida
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-lg border border-gray-300"
              placeholder="Ej: kg, und"
              {...register("unidadMedida", {
                required: "Este campo es obligatorio",
              })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold uppercase">
              Perdidas Estimadas
            </label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border border-gray-300"
              placeholder="Final"
              {...register("perdidasEstimadas", {
                valueAsNumber: true,
              })}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-semibold uppercase">
              Cant. Finales
            </label>
            <input
              type="number"
              className="w-full p-2 rounded-lg border border-gray-300"
              placeholder="Final"
              {...register("cantidadesFinales", {
                valueAsNumber: true,
                required: "Este campo es obligatorio",
                min: { value: 0, message: "Debe ser mayor o igual a 0" },
              })}
            />
          </div>
        </div>
      </section>

      <hr className="my-8 border-gray-300" />

      <MateriaPrimaDirectaForm control={control} register={register} />
      <ManoObraDirectaForm control={control} register={register} />
      <CostosIndirectosFabricacionForm control={control} register={register} />
      <ManoObraIndirectaForm control={control} register={register} />
      <CostosGeneralesForm control={control} register={register} />
      <CostosOperacionForm control={control} register={register} />
      <GastoVentasForm control={control} register={register} />

      <hr className="my-8 border-gray-300" />

      <ConsolidadoCostos
        control={control}
        register={register}
        totalCostosIndirectoFabricaciones={totalCostosIndirectoFabricaciones}
        totalCostosdeProduccion={totalCostosdeProduccion}
        costoProduccionUnitario={costoProduccionUnitario}
        margenUtilidadUnitario={margenUtilidadUnitario}
      />
    </>
  );
}
