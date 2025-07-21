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

export default function CostosGeneralesForm({ control, register }: Props) {
  //   const { setValue } = useFormContext();
  const setTotalCostosGenerales = useCostStore(
    (state) => state.setTotalCostosGenerales
  );
  const totalCostosGenerales = useCostStore(
    (state) => state.totalCostosGenerales
  );

  const { fields, append, remove } = useFieldArray({
    control,
    name: "costosGenerales",
  });
  const costosGenerales = useWatch({
    control,
    name: "costosGenerales",
  });

  useEffect(() => {
    if (!costosGenerales) return;

    const total = costosGenerales.reduce((acc, item) => {
      const { valorTotal } = item;
      return acc + valorTotal;
    }, 0);

    setTotalCostosGenerales(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(costosGenerales)]);

  return (
    <>
      <div className="space-y-2 mb-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold uppercase text-gray-800">
            Costos Generales
          </h2>
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
                Nombre
              </label>
              <input
                type="text"
                placeholder="Nombre"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                {...register(`costosGenerales.${index}.nombre`, {
                  required: true,
                })}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-700">
                Costo Total
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="Costo Total"
                className="w-full px-3 py-2 border rounded-lg bg-white"
                {...register(`costosGenerales.${index}.valorTotal`, {
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
          Total:{" "}
          <span className="font-bold">
            {formattCurrency(totalCostosGenerales)}
          </span>
        </span>
      </div>
    </>
  );
}
