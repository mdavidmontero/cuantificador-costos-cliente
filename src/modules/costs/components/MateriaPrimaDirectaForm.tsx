import {
  useFieldArray,
  useFormContext,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import type { RegistroCostosFormValues } from "../schemas";
import { PlusCircle, Trash2 } from "lucide-react";
import SearchSelectForm from "@/components/shared/search/SearchShared";
import { useQuery } from "@tanstack/react-query";
import { getMateriaPrimas } from "@/modules/material/actions/get-materials.actions";
import type { SchemaMaterialList } from "@/modules/material/schemas";
import type { MeasurementForm } from "@/modules/units/schemas";
import { useEffect } from "react";
import useUnits from "@/hooks/useUnits";
import useCostStore from "../store/useCostStore";
import { formattCurrency } from "@/lib";

interface Props {
  control: Control<RegistroCostosFormValues>;
  register: UseFormRegister<RegistroCostosFormValues>;
}

export default function MateriaPrimaDirectaForm({ control, register }: Props) {
  const setTotalMateriaPrimaDirecta = useCostStore(
    (state) => state.setTotalMateriaPrimaDirecta
  );
  const totalMateriaPrimaDirecta = useCostStore(
    (state) => state.totalMateriaPrimaDirecta
  );
  const { setValue } = useFormContext();
  const { unidadMedida } = useUnits();
  const { data } = useQuery({
    queryKey: ["getMateriaPrimas"],
    queryFn: getMateriaPrimas,
  });
  const materiaPrima = useWatch({
    control,
    name: "materiaPrimaDirecta",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "materiaPrimaDirecta",
  });
  useEffect(() => {
    if (!materiaPrima) return;

    materiaPrima.forEach((item, index) => {
      const cantidad = item?.cantidad || 0;
      const costoUnitario = item?.costoUnitario || 0;
      const total = parseFloat((cantidad * costoUnitario).toFixed(2));

      setValue(`materiaPrimaDirecta.${index}.costoTotal`, total, {
        shouldValidate: false,
        shouldDirty: false,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(materiaPrima)]);

  useEffect(() => {
    if (!materiaPrima) return;

    const total = materiaPrima.reduce((acc, item) => {
      const { cantidad, costoUnitario } = item;
      return acc + cantidad * costoUnitario;
    }, 0);

    setTotalMateriaPrimaDirecta(total);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(materiaPrima)]);

  const options =
    data?.map((item: SchemaMaterialList) => ({
      label: item.nombre,
      value: item.nombre,
    })) ?? [];

  const optionsUnidad =
    unidadMedida?.map((item: MeasurementForm) => ({
      label: item.name,
      value: item.name,
    })) ?? [];
  return (
    <>
      <h3 className="bg-blue-600 text-white text-lg font-semibold text-center py-2 rounded-md shadow-md uppercase tracking-wide">
        Costos Directos de Fabricacion
      </h3>
      <div className="space-y-4 mb-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold uppercase text-gray-800">
            Materia Prima Directa
          </h2>
          <button
            type="button"
            onClick={() =>
              append({
                name: "",
                unidadMedida: "",
                cantidad: 0,
                costoUnitario: 0,
                costoTotal: 0,
              })
            }
            className="flex items-center gap-2 text-sm text-white bg-green-500 hover:bg-green-600 px-4 py-2 rounded-md shadow-sm"
          >
            <PlusCircle size={18} />
            Agregar
          </button>
        </div>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-3  "
          >
            <SearchSelectForm
              name={`materiaPrimaDirecta.${index}.name`}
              control={control}
              options={options}
              placeholder="Buscar "
            />

            <SearchSelectForm
              name={`materiaPrimaDirecta.${index}.unidadMedida`}
              control={control}
              options={optionsUnidad}
              placeholder="Unidad"
            />

            <input
              type="number"
              step="0.01"
              placeholder="Cantidad"
              className="border px-3 py-2 rounded-lg"
              {...register(`materiaPrimaDirecta.${index}.cantidad`, {
                valueAsNumber: true,
              })}
            />

            <input
              type="number"
              step="0.01"
              placeholder="Costo Unitario"
              className="border px-3 py-2 rounded-lg"
              {...register(`materiaPrimaDirecta.${index}.costoUnitario`, {
                valueAsNumber: true,
              })}
            />

            <input
              type="number"
              placeholder="Costo Total"
              className="border px-3 py-2 rounded-lg bg-gray-200 text-gray-800"
              readOnly
              {...register(`materiaPrimaDirecta.${index}.costoTotal`, {
                valueAsNumber: true,
              })}
            />

            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-600 hover:text-red-800 flex items-center justify-center"
            >
              <Trash2 />
            </button>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 mt-6">
        <div className="md:col-start-3 flex items-center">
          <span className="inline-block w-full bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-md shadow-sm border border-blue-300 text-center">
            <span className="font-bold">
              {formattCurrency(
                materiaPrima.reduce(
                  (acc, item) => acc + (item?.cantidad || 0),
                  0
                )
              )}
            </span>
          </span>
        </div>

        <div className="flex items-center">
          <span className="inline-block w-full bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-md shadow-sm border border-blue-300 text-center">
            <span className="font-bold">
              {formattCurrency(
                materiaPrima.reduce(
                  (acc, item) => acc + (item?.costoUnitario || 0),
                  0
                )
              )}
            </span>
          </span>
        </div>

        <div className="flex items-center">
          <span className="inline-block w-full bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-2 rounded-md shadow-sm border border-blue-300 text-center">
            <span className="font-bold">
              {formattCurrency(totalMateriaPrimaDirecta)}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
