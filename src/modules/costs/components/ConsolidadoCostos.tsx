import { formattCurrency } from "@/lib";
import { useState, useEffect } from "react";
import type { Control, UseFormRegister, UseFormSetValue } from "react-hook-form";
import type { RegistroCostosFormValues } from "../schemas";

interface Props {
  control: Control<RegistroCostosFormValues>;
  register: UseFormRegister<RegistroCostosFormValues>;
  setValue: UseFormSetValue<RegistroCostosFormValues>;
  totalCostosIndirectoFabricaciones: number;
  totalCostosdeProduccion: number;
  costoProduccionUnitario: number;
  margenUtilidadUnitario: number;
}

export default function ConsolidadoCostos({
  register,
  setValue,
  totalCostosIndirectoFabricaciones,
  totalCostosdeProduccion,
  costoProduccionUnitario,
  margenUtilidadUnitario,
}: Props) {
  const [calculoInverso, setCalculoInverso] = useState(false);
  const [margenDeseado, setMargenDeseado] = useState(30); // Valor predeterminado de 30%
  const [impuestos, setImpuestos] = useState(19); // IVA predeterminado 19%
  const [costosFinancieros, setCostosFinancieros] = useState(5); // 5% predeterminado
  const [otrosGastos, setOtrosGastos] = useState(3); // 3% predeterminado
  
  // Cálculo del margen neto (considerando impuestos y otros gastos)
  // El margen neto se calcula como el margen bruto menos los gastos adicionales como porcentaje
  const margenUtilidadNeto = Math.max(0, margenUtilidadUnitario - impuestos - costosFinancieros - otrosGastos);
  
  // Función para calcular el precio de venta a partir del margen deseado
  const calcularPrecioVenta = () => {
    if (margenDeseado >= 100) return; // Evitar división por cero o margen inválido
    
    // Fórmula: Precio = Costo / (1 - Margen/100)
    const precioCalculado = costoProduccionUnitario / (1 - margenDeseado / 100);
    
    // Actualizar el precio de venta en el formulario
    setValue("costoProduccion.precioVentaUnitario", precioCalculado);
    
    // También guardar el precio calculado como un campo separado para referencia
    setValue("costoProduccion.precioCalculado", precioCalculado);
  };

  // Efecto para guardar automáticamente los valores en el formulario
  useEffect(() => {
    setValue("costoProduccion.margenDeseado", margenDeseado);
    setValue("costoProduccion.impuestos", impuestos);
    setValue("costoProduccion.costosFinancieros", costosFinancieros);
    setValue("costoProduccion.otrosGastos", otrosGastos);
    setValue("costoProduccion.margenUtilidadNeto", margenUtilidadNeto);
  }, [margenDeseado, impuestos, costosFinancieros, otrosGastos, margenUtilidadNeto, setValue]);
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
        
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-gray-700">Modo de Cálculo</h4>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setCalculoInverso(false)}
                className={`px-4 py-2 text-sm rounded-md ${!calculoInverso ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Precio → Margen
              </button>
              <button
                type="button"
                onClick={() => setCalculoInverso(true)}
                className={`px-4 py-2 text-sm rounded-md ${calculoInverso ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                Margen → Precio
              </button>
            </div>
          </div>
          
          {!calculoInverso ? (
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
            </div>
          ) : (
            <div className="space-y-4">
              <label className="block text-sm font-semibold text-gray-700">
                Margen de Utilidad Deseado (%)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min="0"
                  max="99.99"
                  step="0.01"
                  value={margenDeseado}
                  onChange={(e) => setMargenDeseado(parseFloat(e.target.value))}
                  className="w-full p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Ej: 30"
                />
                <button
                  type="button"
                  onClick={calcularPrecioVenta}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg"
                >
                  Calcular
                </button>
              </div>
              <p className="text-sm text-gray-600">
                Precio calculado: <span className="font-semibold">{formattCurrency(costoProduccionUnitario / (1 - margenDeseado / 100))}</span>
              </p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-700 mb-2">Márgenes de Utilidad</h4>
          
          <div className="bg-green-50 border border-green-300 p-4 rounded-md text-green-800 font-semibold">
            <div className="flex justify-between items-center mb-2">
              <span>Margen de Utilidad Bruto:</span>
              <span>{margenUtilidadUnitario.toFixed(2)}%</span>
            </div>
            <div className="text-xs text-gray-600 mb-4">
              Margen sin considerar impuestos ni otros gastos indirectos
            </div>
            
            <div className="pt-3 border-t border-green-200">
              <div className="flex justify-between items-center mb-1">
                <span>Impuestos:</span>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    step="0.1"
                    value={impuestos}
                    onChange={(e) => setImpuestos(parseFloat(e.target.value))}
                    className="w-16 p-1 text-right border rounded text-sm"
                  />
                  <span className="ml-1">%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-1">
                <span>Costos Financieros:</span>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    step="0.1"
                    value={costosFinancieros}
                    onChange={(e) => setCostosFinancieros(parseFloat(e.target.value))}
                    className="w-16 p-1 text-right border rounded text-sm"
                  />
                  <span className="ml-1">%</span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mb-3">
                <span>Otros Gastos Indirectos:</span>
                <div className="flex items-center">
                  <input 
                    type="number" 
                    min="0" 
                    max="100" 
                    step="0.1"
                    value={otrosGastos}
                    onChange={(e) => setOtrosGastos(parseFloat(e.target.value))}
                    className="w-16 p-1 text-right border rounded text-sm"
                  />
                  <span className="ml-1">%</span>
                </div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-green-200 flex justify-between items-center font-bold">
              <span>Margen de Utilidad Neto:</span>
              <span className={margenUtilidadNeto < 0 ? 'text-red-600' : ''}>
                {margenUtilidadNeto.toFixed(2)}%
              </span>
            </div>
          </div>
          
          <div className="text-xs text-gray-500 italic text-center mt-2">
            El margen neto considera impuestos, costos financieros y otros gastos indirectos para una visión más completa de la rentabilidad.
          </div>
        </div>
      </section>
    </div>
  );
}
