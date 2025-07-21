import { formattCurrency } from "@/lib";
import type { Control, UseFormRegister } from "react-hook-form";
import type { RegistroCostosFormValues } from "../schemas";

interface Props {
  control: Control<RegistroCostosFormValues>;
  register: UseFormRegister<RegistroCostosFormValues>;
  totalCostosIndirectoFabricaciones: number;
  totalCostosdeProduccion: number;
  costoProduccionUnitario: number;
  margenUtilidadUnitario: number;
}

export default function ConsolidadoCostos({
  register,
  totalCostosIndirectoFabricaciones,
  totalCostosdeProduccion,
  costoProduccionUnitario,
  margenUtilidadUnitario,
}: Props) {
  return (
    <div className="space-y-10">
      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
          Consolidado de Costos
        </h3>
        <div className="grid gap-4 text-center text-gray-700">
          <div className="bg-blue-50 rounded-md py-3 shadow-sm border border-blue-200">
            <p className="text-base font-medium">
              Total Costos Indirectos de Fabricación
            </p>
            <strong className="text-blue-800 text-lg">
              {formattCurrency(totalCostosIndirectoFabricaciones)}
            </strong>
          </div>

          <div className="bg-blue-50 rounded-md py-3 shadow-sm border border-blue-200">
            <p className="text-base font-medium">Total Gastos de Producción</p>
            <strong className="text-blue-800 text-lg">
              {formattCurrency(totalCostosdeProduccion)}
            </strong>
          </div>

          <div className="bg-blue-50 rounded-md py-3 shadow-sm border border-blue-200">
            <p className="text-base font-medium">
              Total Costo de Producción Unitario
            </p>
            <strong className="text-blue-800 text-lg">
              {formattCurrency(costoProduccionUnitario)}
            </strong>
          </div>
        </div>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
          Información de Precios de Venta
        </h3>
        <div className="space-y-4">
          <label className="block text-sm font-semibold text-gray-700">
            Precio de Venta Unitario
          </label>
          <input
            type="number"
            placeholder="Ej: 5000"
            className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            {...register("costoProduccion.precioVentaUnitario", {
              valueAsNumber: true,
            })}
          />
          <div className="bg-green-50 border border-green-300 p-4 rounded-md text-green-800 font-semibold text-center">
            Margen de Utilidad Unitario: {margenUtilidadUnitario.toFixed(2)}%
          </div>
        </div>
      </section>
    </div>
  );
}
