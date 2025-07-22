import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { productSchemaFormData } from "../schemas";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { createProduct } from "../actions/create-product.actions";

export default function CreateProductsView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialValues: productSchemaFormData = {
    nombre: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<productSchemaFormData>({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: productSchemaFormData) => {
    mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">Productos</h1>
      <p className="text-muted-foreground text-lg mt-2">
        Llena el siguiente formulario para los Productos
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
      >
        <div className="space-y-3 mb-5">
          <label
            htmlFor="name"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Nombre Producto"
            {...register("nombre", { required: "El nombre es obligatorio" })}
            className="w-full border border-gray-200  p-3 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {errors.nombre && (
            <ErrorMessage>{errors.nombre.message}</ErrorMessage>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 w-full p-3 text-white uppercase font-bold cursor-pointer transition-colors"
        >
          Guardar
        </button>
      </form>
    </div>
  );
}
