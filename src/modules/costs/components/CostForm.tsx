import {
  type Control,
  type FieldArrayWithId,
  type UseFieldArrayAppend,
  type UseFieldArrayRemove,
  type UseFormRegister,
  useFormContext,
  useWatch,
} from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { getMateriaPrimas } from "@/modules/material/actions/get-materials.actions";
import type { RegistroCostosFormValues } from "../schemas";
import type { SchemaMaterialList } from "@/modules/material/schemas";
import { useEffect } from "react";
import SearchSelectForm from "@/components/shared/search/SearchShared";

interface CostFormProps {
  control: Control<RegistroCostosFormValues>;
  fields: FieldArrayWithId<
    RegistroCostosFormValues,
    "materiaPrimaDirecta",
    "id"
  >[];
  append: UseFieldArrayAppend<RegistroCostosFormValues, "materiaPrimaDirecta">;
  remove: UseFieldArrayRemove;
  register: UseFormRegister<RegistroCostosFormValues>;
}

export default function CostForm({
  register,
  control,
  fields,
  append,
  remove,
}: CostFormProps) {
  const { data } = useQuery({
    queryKey: ["getMateriaPrimas"],
    queryFn: getMateriaPrimas,
  });

  const { setValue } = useFormContext();

  const materiaPrima = useWatch({
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
  }, [JSON.stringify(materiaPrima)]);

  const options =
    data?.map((item: SchemaMaterialList) => ({
      label: item.nombre,
      value: item.id.toString(),
    })) ?? [];
  return (
    <>
      <div className="space-y-3 mb-5">
        <label htmlFor="productoId" className="text-sm uppercase font-bold">
          Producto ID
        </label>
        <input
          id="productoId"
          type="number"
          {...register("productoId", { valueAsNumber: true })}
          className="w-full p-2 rounded-lg border border-gray-200"
        />
      </div>

      {/* Detalles generales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="space-y-1">
          <label className="text-sm uppercase font-bold">
            Cantidades Producidas
          </label>
          <input
            type="text"
            placeholder="Cantidad"
            className="w-full p-2 rounded-lg border border-gray-200"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm uppercase font-bold">
            Unidad de Medida
          </label>
          <input
            type="text"
            placeholder="Unidad"
            className="w-full p-2 rounded-lg border border-gray-200"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm uppercase font-bold">
            Cantidades Finales
          </label>
          <input
            type="text"
            placeholder="Final"
            className="w-full p-2 rounded-lg border border-gray-200"
          />
        </div>
      </div>

      <div className="space-y-4 mb-5">
        <h3 className="font-bold text-lg uppercase">Materia Prima Directa</h3>

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-3 border p-4 rounded-lg"
          >
            {/* Campo name con buscador */}
            <SearchSelectForm
              name={`materiaPrimaDirecta.${index}.name`}
              control={control}
              options={options}
              placeholder="Buscar nombre de materia prima"
            />

            {/* Campo unidad de medida (manual) */}
            <input
              className="border p-2 rounded"
              {...register(`materiaPrimaDirecta.${index}.unidadMedida`)}
              placeholder="Unidad"
            />

            {/* Campo cantidad */}
            <input
              type="number"
              step="0.01"
              className="border p-2 rounded"
              {...register(`materiaPrimaDirecta.${index}.cantidad`, {
                valueAsNumber: true,
              })}
              placeholder="Cantidad"
            />

            {/* Campo costo unitario */}
            <input
              type="number"
              step="0.01"
              className="border p-2 rounded"
              {...register(`materiaPrimaDirecta.${index}.costoUnitario`, {
                valueAsNumber: true,
              })}
              placeholder="Costo Unitario"
            />

            {/* Campo costo total */}
            <input
              type="number"
              className="border p-2 rounded bg-gray-100"
              {...register(`materiaPrimaDirecta.${index}.costoTotal`, {
                valueAsNumber: true,
              })}
              readOnly
            />

            <button
              type="button"
              className="text-red-600 hover:text-red-800"
              onClick={() => remove(index)}
            >
              Eliminar
            </button>
          </div>
        ))}

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
          className="bg-[#1B5040] hover:bg-[#304b43] text-white px-4 py-2 rounded font-bold"
        >
          Agregar Materia Prima
        </button>
      </div>
    </>
  );
}
