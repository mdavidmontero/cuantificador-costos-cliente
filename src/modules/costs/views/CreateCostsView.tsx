import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  FormProvider,
  useForm,
  useFieldArray,
  useWatch,
} from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import type { RegistroCostosFormValues } from "../schemas";
import CostForm from "../components/CostForm";

export default function CreateCostsView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const methods = useForm<RegistroCostosFormValues>({
    defaultValues: {
      productoId: 0,
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

  const { control, handleSubmit } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "materiaPrimaDirecta",
  });

  const materiaPrimaValues = useWatch({
    control,
    name: "materiaPrimaDirecta",
  });

  const subtotalMateriaPrima =
    materiaPrimaValues?.reduce(
      (acc, item) => acc + (item?.costoTotal || 0),
      0
    ) ?? 0;

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: RegistroCostosFormValues) => {
      const response = await axios.post("/api/costos", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Registro creado con éxito");
      queryClient.invalidateQueries({ queryKey: ["costos"] });
      navigate("/costos");
    },
    onError: () => {
      toast.error("Hubo un error al guardar el registro");
    },
  });

  const onSubmit = (data: RegistroCostosFormValues) => {
    mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto">
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
            fields={fields}
            append={append}
            remove={remove}
            control={control}
            register={methods.register}
          />

          {/* Mostrar Subtotal Materia Prima */}
          <div className="text-right">
            <p className="text-lg font-semibold">
              Subtotal Materia Prima:{" "}
              <span className="text-blue-600 font-bold">
                ${subtotalMateriaPrima.toFixed(2)}
              </span>
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isPending}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {isPending ? "Guardando..." : "Guardar registro"}
            </button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
