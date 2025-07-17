import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import CostForm from "../components/CostForm";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import type { RegistroCostosFormValues } from "../schemas";

export default function CreateCostsView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<RegistroCostosFormValues>({
    defaultValues: {
      productoId: "",
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

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
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

  const onSubmit = (data: any) => {
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 bg-white shadow-lg p-10 rounded-lg space-y-8"
      >
        <CostForm control={control} />

        {/* <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isPending ? "Guardando..." : "Guardar registro"}
          </button>
        </div> */}
      </form>
    </div>
  );
}
