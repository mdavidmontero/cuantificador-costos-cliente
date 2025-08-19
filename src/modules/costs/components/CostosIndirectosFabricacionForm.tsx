import { PlusCircle, Trash2, Info } from "lucide-react";
import {
  useFieldArray,
  useFormContext,
  useWatch,
  type Control,
  type UseFormRegister,
} from "react-hook-form";
import type { RegistroCostosFormValues } from "../schemas";
import SearchSelectForm from "@/components/shared/search/SearchShared";
import useUnits from "@/hooks/useUnits";
import type { MeasurementForm } from "@/modules/units/schemas";
import { useEffect, useState } from "react";
import useCostStore from "../store/useCostStore";
import { formattCurrency } from "@/lib";
interface Props {
  control: Control<RegistroCostosFormValues>;
  register: UseFormRegister<RegistroCostosFormValues>;
}

export default function CostosIndirectosFabricacionForm({
  control,
  register,
}: Props) {
  const { setValue } = useFormContext();
  const { unidadMedida } = useUnits();
  const setTotalMateriaPrimaIndirecta = useCostStore(
    (state) => state.setTotalMateriaPrimaIndirecta
  );
  const totalMateriaPrimaIndirecta = useCostStore(
    (state) => state.totalMateriaPrimaIndirecta
  );
  const costosIndrectosFabricacion = useWatch({
    control,
    name: "costosIndirectosFabricacion",
  });
  
  const [showServiciosInfo, setShowServiciosInfo] = useState(false);
  const [showServiciosForm, setShowServiciosForm] = useState(false);
  const [nuevoServicio, setNuevoServicio] = useState({ nombre: "", porcentaje: 0, vinculadoProduccion: true });
  
  const { fields: serviciosFields, append: appendServicio, remove: removeServicio } = useFieldArray({
    control,
    name: "serviciosPublicos",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "costosIndirectosFabricacion",
  });
  useEffect(() => {
    if (!costosIndrectosFabricacion) return;

    costosIndrectosFabricacion.forEach((item, index) => {
      const cantidad = item?.cantidad || 0;
      const costoUnitario = item?.costoUnitario || 0;
      const total = parseFloat((cantidad * costoUnitario).toFixed(2));

      setValue(`costosIndirectosFabricacion.${index}.costoTotal`, total, {
        shouldValidate: false,
        shouldDirty: false,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(costosIndrectosFabricacion)]);

  useEffect(() => {
    if (!costosIndrectosFabricacion) return;

    const total = costosIndrectosFabricacion.reduce((acc, item) => {
      const { cantidad, costoUnitario } = item;
      return acc + cantidad * costoUnitario;
    }, 0);

    setTotalMateriaPrimaIndirecta(total);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(costosIndrectosFabricacion)]);

  const optionsUnidad =
    unidadMedida?.map((item: MeasurementForm) => ({
      label: item.name,
      value: item.name,
    })) ?? [];
  return (
    <>
      <h3 className="bg-blue-600 text-white text-lg font-semibold text-center py-2 rounded-md shadow-md uppercase tracking-wide">
        Costos Indirectos de Fabricacion
      </h3>
      
      {/* Sección de Servicios Públicos */}
      <div className="space-y-4 mb-8 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="font-bold uppercase text-gray-800">
              Servicios Públicos
            </h2>
            <button
              type="button"
              onClick={() => setShowServiciosInfo(!showServiciosInfo)}
              className="text-blue-600 hover:text-blue-800"
              title="Información sobre servicios públicos"
            >
              <Info size={18} />
            </button>
          </div>
          <button
            type="button"
            onClick={() => setShowServiciosForm(!showServiciosForm)}
            className="flex items-center gap-2 text-sm text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md shadow-sm"
          >
            {showServiciosForm ? "Ocultar" : "Configurar Servicios"}
          </button>
        </div>
        
        {showServiciosInfo && (
          <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">Desagregación de Servicios Públicos</h4>
            <p className="text-sm text-gray-700 mb-2">
              Asigne un porcentaje a cada servicio público involucrado en el proceso productivo (agua, energía, internet, gas, etc.).
              La suma total debe ser 100%.
            </p>
            <p className="text-sm text-gray-700">
              Marque los servicios que están directamente vinculados al proceso productivo para un cálculo más preciso de costos.
            </p>
          </div>
        )}
        
        {showServiciosForm && (
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4">
            <h4 className="font-semibold text-gray-800 mb-3">Configuración de Servicios Públicos</h4>
            
            {/* Formulario para configurar los servicios públicos */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Servicio</label>
                <input 
                  type="text" 
                  className="w-full p-2 border rounded" 
                  placeholder="Ej: Energía" 
                  value={nuevoServicio.nombre}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, nombre: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Porcentaje (%)</label>
                <input 
                  type="number" 
                  min="0" 
                  max="100" 
                  className="w-full p-2 border rounded" 
                  placeholder="Ej: 25" 
                  value={nuevoServicio.porcentaje}
                  onChange={(e) => setNuevoServicio({...nuevoServicio, porcentaje: parseFloat(e.target.value) || 0})}
                />
              </div>
              <div className="flex items-end">
                <label className="inline-flex items-center mb-1 w-full">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-5 w-5 text-blue-600" 
                    checked={nuevoServicio.vinculadoProduccion}
                    onChange={(e) => setNuevoServicio({...nuevoServicio, vinculadoProduccion: e.target.checked})}
                  />
                  <span className="ml-2 text-sm text-gray-700">Vinculado a producción</span>
                </label>
              </div>
            </div>
            
            <div className="flex justify-end">
              <button 
                type="button" 
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm"
                onClick={() => {
                  if (nuevoServicio.nombre.trim() === "") {
                    alert("Debe ingresar un nombre para el servicio");
                    return;
                  }
                  if (nuevoServicio.porcentaje <= 0 || nuevoServicio.porcentaje > 100) {
                    alert("El porcentaje debe estar entre 1 y 100");
                    return;
                  }
                  appendServicio(nuevoServicio);
                  setNuevoServicio({ nombre: "", porcentaje: 0, vinculadoProduccion: true });
                }}
              >
                Agregar Servicio
              </button>
            </div>
            
            <div className="mt-4">
              <h5 className="font-medium text-gray-700 mb-2">Servicios Configurados</h5>
              <div className="bg-white border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Servicio</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Porcentaje</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vinculado</th>
                      <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {serviciosFields.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-500">
                          No hay servicios configurados
                        </td>
                      </tr>
                    ) : (
                      serviciosFields.map((servicio, index) => (
                        <tr key={servicio.id}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                            {servicio.nombre}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                            {servicio.porcentaje}%
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                            {servicio.vinculadoProduccion ? "Sí" : "No"}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">
                            <button 
                              type="button"
                              onClick={() => removeServicio(index)}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-3 text-right">
                <span className="text-sm font-medium">
                  Total: <span className={`${serviciosFields.reduce((acc, item) => acc + item.porcentaje, 0) === 100 ? "text-green-600" : "text-red-600"}`}>
                    {serviciosFields.reduce((acc, item) => acc + item.porcentaje, 0)}%
                  </span> 
                  {serviciosFields.reduce((acc, item) => acc + item.porcentaje, 0) !== 100 && (
                    <span className="text-red-600"> (Debe sumar 100%)</span>
                  )}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="space-y-4 mb-5">
        <div className="flex items-center justify-between">
          <h2 className="font-bold uppercase text-gray-800">
            Materia Prima Indirecta
          </h2>
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

        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-6 gap-3  "
          >
            <input
              type="text"
              step="0.01"
              placeholder="Nombre"
              className="border px-3 py-2 rounded-lg"
              {...register(`costosIndirectosFabricacion.${index}.nombre`, {
                required: true,
              })}
            />
            <SearchSelectForm
              name={`costosIndirectosFabricacion.${index}.unidadMedida`}
              control={control}
              options={optionsUnidad}
              placeholder="Unidad"
            />

            <input
              type="number"
              step="0.01"
              placeholder="Cantidad"
              className="border px-3 py-2 rounded-lg"
              {...register(`costosIndirectosFabricacion.${index}.cantidad`, {
                valueAsNumber: true,
              })}
            />

            <input
              type="number"
              step="0.01"
              placeholder="Costo Unitario"
              className="border px-3 py-2 rounded-lg"
              {...register(
                `costosIndirectosFabricacion.${index}.costoUnitario`,
                {
                  valueAsNumber: true,
                }
              )}
            />

            <input
              type="number"
              placeholder="Costo Total"
              className="border px-3 py-2 rounded-lg bg-gray-200 text-gray-800"
              readOnly
              {...register(`costosIndirectosFabricacion.${index}.costoTotal`, {
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
                costosIndrectosFabricacion?.reduce(
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
                costosIndrectosFabricacion?.reduce(
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
              {formattCurrency(totalMateriaPrimaIndirecta)}
            </span>
          </span>
        </div>
      </div>
    </>
  );
}
