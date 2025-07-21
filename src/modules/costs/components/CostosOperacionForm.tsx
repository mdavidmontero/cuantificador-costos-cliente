import {
  useFieldArray,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import type { RegistroCostosFormValues } from "../schemas";
import { PlusCircle, Trash2 } from "lucide-react";
import useCostStore from "../store/useCostStore";
import { useEffect } from "react";
import { formattCurrency } from "@/lib";
interface Props {
  control: Control<RegistroCostosFormValues>;
  register: UseFormRegister<RegistroCostosFormValues>;
}
export default function CostosOperacionForm({ control, register }: Props) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "costosOperacion",
  });
  const gastosAdministracion = useWatch({
    control,
    name: "costosOperacion",
  });

  const setTotalGastosAdministracion = useCostStore(
    (state) => state.setTotalGastosAdministracion
  );
  const totalGastosAdministracion = useCostStore(
    (state) => state.totalGastosAdministracion
  );
  useEffect(() => {
    if (!gastosAdministracion) return;

    const total = gastosAdministracion.reduce((acc, item) => {
      const { valorTotal } = item;
      return acc + valorTotal;
    }, 0);

    setTotalGastosAdministracion(total);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(gastosAdministracion)]);

  return (
    <>
      <h3 className="bg-blue-600 text-white text-lg font-semibold text-center py-2 rounded-md shadow-md uppercase tracking-wide">
        Costos de Operación
      </h3>
      <div className="space-y-4 mb-5">
        <div className="flex items-center justify-end">
          <button
            type="button"
            onClick={() =>
              append({
                nombre: "",
                valorTotal: 0,
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
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-center"
          >
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Gastos de Administración
              </label>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`costosOperacion.${index}.nombre`, {
                  required: true,
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Valor Total
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Costo Total"
                className="w-full px-3 py-2 border rounded-lg bg-white"
                {...register(`costosOperacion.${index}.valorTotal`, {
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="flex justify-end items-end h-full">
              <button
                type="button"
                onClick={() => remove(index)}
                className="text-red-600 hover:text-red-800 p-2 rounded-full"
                title="Eliminar"
              >
                <Trash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end mt-6">
        <span className="inline-block bg-blue-100 text-blue-800 text-sm md:text-base font-semibold px-5 py-2 rounded-md shadow-sm border border-blue-300">
          Total Gastos de Administración:{" "}
          <span className="font-bold">
            {formattCurrency(totalGastosAdministracion)}
          </span>
        </span>
      </div>
    </>
  );
}
