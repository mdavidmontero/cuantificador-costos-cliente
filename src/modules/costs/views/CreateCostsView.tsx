import { useNavigate } from "react-router";
import { useMutation } from "@tanstack/react-query";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import type { RegistroCostosFormValues } from "../schemas";
import CostForm from "../components/CostForm";
import useCostStore from "../store/useCostStore";
import { createCost } from "../actions/create-cost.actions";

export default function CreateCostsView() {
  const navigate = useNavigate();
  const totalgastosMercadeo = useCostStore(
    (state) => state.totalgastosMercadeo
  );
  const totalCostosOperacion = useCostStore(
    (state) => state.totalCostosOperacion
  );
  const totalGastosProduccion = useCostStore(
    (state) => state.totalGastosProduccion
  );
  const totalCostoProduccionUnitario = useCostStore(
    (state) => state.totalCostoProduccionUnitario
  );

  const margenUtilidadUnitario = useCostStore(
    (state) => state.margenUtilidadUnitario
  );

  const methods = useForm<RegistroCostosFormValues>({
    defaultValues: {
      productoId: 0,
      cantidadProducida: 0,
      unidadMedida: "",
      perdidasEstimadas: 0,
      cantidadesFinales: 0,
      organizationId: "",
      materiaPrimaDirecta: [],
      manoObraDirecta: [],
      costosIndirectosFabricacion: [],
      manoObraIndirecta: [],
      costosGenerales: [],
      costosOperacion: [],
      gastosVentas: [],
      costoProduccion: {
        totalGastosMercadeo: 0,
        totalCostosOperacion: 0,
        totalGastosProduccion: 0,
        totalCostoProduccionUnitario: 0,
        precioVentaUnitario: 0,
        margenUtilidadUnitario: 0,
      },
    },
  });

  const { control, handleSubmit, setValue } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: createCost,
    onSuccess: (data) => {
      toast.success(data);
      // queryClient.invalidateQueries({ queryKey: ["costos"] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (data: RegistroCostosFormValues) => {
    const formData: RegistroCostosFormValues = {
      productoId: data.productoId,
      cantidadProducida: data.cantidadProducida,
      unidadMedida: data.unidadMedida,

      perdidasEstimadas: data.perdidasEstimadas,
      cantidadesFinales: data.cantidadesFinales,
      organizationId: "0ab6a1ca-ea1b-46b7-acfa-51cc76be5e7f",
      materiaPrimaDirecta: data.materiaPrimaDirecta,
      manoObraDirecta: data.manoObraDirecta,
      costosIndirectosFabricacion: data.costosIndirectosFabricacion,
      manoObraIndirecta: data.manoObraIndirecta,
      serviciosPublicos: data.serviciosPublicos,
      costosGenerales: data.costosGenerales,
      costosOperacion: data.costosOperacion,
      gastosVentas: data.gastosVentas,
      costoProduccion: {
        totalGastosMercadeo: totalgastosMercadeo,
        totalCostosOperacion: totalCostosOperacion,
        totalGastosProduccion: totalGastosProduccion,
        totalCostoProduccionUnitario: totalCostoProduccionUnitario,
        precioVentaUnitario: data.costoProduccion.precioVentaUnitario,
        margenUtilidadUnitario: margenUtilidadUnitario,
        margenDeseado: data.costoProduccion.margenDeseado,
        impuestos: data.costoProduccion.impuestos,
        costosFinancieros: data.costoProduccion.costosFinancieros,
        otrosGastos: data.costoProduccion.otrosGastos,
        margenUtilidadNeto: data.costoProduccion.margenUtilidadNeto,
      },
    };
    console.log("datos", formData);
    // return;
    mutate(formData);
  };

  return (
    <div className="max-w-5xl mx-auto ">
      <h1 className="text-4xl font-bold tracking-tight">
        Costo de Producción por Producto
      </h1>
      <p className="text-muted-foreground text-lg mt-2">
        Llena el siguiente formulario para calcular los costos de producción de
        un producto.
      </p>

      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 bg-white shadow-lg p-10 rounded-lg space-y-8"
        >
          <CostForm
            setValue={setValue}
            control={control}
            register={methods.register}
            watch={methods.watch}
          />

          {/* <div className="text-right">
            <p className="text-lg font-semibold">
              Subtotal Materia Prima:{" "}
              <span className="text-blue-600 font-bold">
                ${subtotalMateriaPrima.toFixed(2)}
              </span>
            </p>
          </div> */}

          <div className="flex justify-center items-center">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 w-full"
            >
              {isPending ? "Guardando..." : "Guardar registro"}
            </button>
            {totalgastosMercadeo}
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
