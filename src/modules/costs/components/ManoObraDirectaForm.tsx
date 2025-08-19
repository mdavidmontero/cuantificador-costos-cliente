import {
  useFieldArray,
  useFormContext,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import type { RegistroCostosFormValues } from "../schemas";
import { PlusCircle, Trash2, Info } from "lucide-react";
import { useEffect, useState } from "react";
import useCostStore from "../store/useCostStore";
import useConfigStore from "@/modules/config/store/useConfigStore";
import { formattCurrency } from "@/lib";

interface Props {
  control: Control<RegistroCostosFormValues>;
  register: UseFormRegister<RegistroCostosFormValues>;
}

export default function ManoObraDirectaForm({ control, register }: Props) {
  const { setValue } = useFormContext();
  const setTotalManoObraDirecta = useCostStore(
    (state) => state.setTotalManoObraDirecta
  );
  const totalManoObraDirecta = useCostStore(
    (state) => state.totalManoObraDirecta
  );
  const manoObraDirecta = useWatch({
    control,
    name: "manoObraDirecta",
  });

  const [showSalarioInfo, setShowSalarioInfo] = useState(false);
  const salarioMinimoLegal = useConfigStore((state) => state.salarioMinimoLegal);
  const { fields, append, remove } = useFieldArray({
    control,
    name: "manoObraDirecta",
  });

  useEffect(() => {
    if (!manoObraDirecta) return;

    manoObraDirecta.forEach((item, index) => {
      const cantidad = item?.cantidad || 0;
      const costoUnitario = item?.costoUnitario || 0;
      const total = parseFloat((cantidad * costoUnitario).toFixed(2));
      setValue(`manoObraDirecta.${index}.costoTotal`, total, {
        shouldValidate: false,
        shouldDirty: false,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(manoObraDirecta)]);

  useEffect(() => {
    if (!manoObraDirecta) return;

    const total = manoObraDirecta.reduce((acc, item) => {
      const { cantidad, costoUnitario } = item;
      return acc + cantidad * costoUnitario;
    }, 0);

    setTotalManoObraDirecta(total);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(manoObraDirecta)]);

  return (
    <>
      <div className="space-y-4 mb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-bold uppercase text-gray-800">
              Mano de Obra Directa
            </h2>
            <button
              type="button"
              onClick={() => setShowSalarioInfo(!showSalarioInfo)}
              className="text-blue-600 hover:text-blue-800"
              title="Información sobre salario mínimo"
            >
              <Info size={18} />
            </button>
          </div>
          <button
            type="button"
            onClick={() =>
              append({
                nombre: "",
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

        {showSalarioInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">
              Marco de Referencia - Salario Mínimo Legal Vigente
            </h4>
            <p className="text-sm text-gray-700 mb-2">
              El salario mínimo legal vigente es:{" "}
              <span className="font-bold">
                {formattCurrency(salarioMinimoLegal)}
              </span>{" "}
              mensual
            </p>
            <p className="text-sm text-gray-700">
              Este valor puede servir como referencia para calcular los costos
              de mano de obra directa, considerando las horas trabajadas y el
              tipo de contratación.
            </p>
          </div>
        )}

        {fields.map((field, index) => (
          <div key={field.id} className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <input
              type="text"
              placeholder="Nombre"
              className="border px-3 py-2 rounded-lg"
              {...register(`manoObraDirecta.${index}.nombre`, {
                required: true,
              })}
            />

            <input
              type="text"
              placeholder="Unidad de Medida"
              className="border px-3 py-2 rounded-lg"
              {...register(`manoObraDirecta.${index}.unidadMedida`, {
                required: true,
              })}
            />

            <input
              type="number"
              step="0.01"
              placeholder="Cantidad"
              className="border px-3 py-2 rounded-lg"
              {...register(`manoObraDirecta.${index}.cantidad`, {
                valueAsNumber: true,
              })}
            />

            <input
              type="number"
              step="0.01"
              placeholder="Costo Unitario"
              className="border px-3 py-2 rounded-lg"
              {...register(`manoObraDirecta.${index}.costoUnitario`, {
                valueAsNumber: true,
              })}
            />

            <input
              type="number"
              placeholder="Costo Total"
              className="border px-3 py-2 rounded-lg bg-gray-200 text-gray-800"
              readOnly
              {...register(`manoObraDirecta.${index}.costoTotal`, {
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
                manoObraDirecta.reduce(
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
                manoObraDirecta.reduce(
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
              {formattCurrency(totalManoObraDirecta)}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
