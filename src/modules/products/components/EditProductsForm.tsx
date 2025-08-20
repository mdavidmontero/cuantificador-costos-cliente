import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import type { ProductoForm } from "../schemas";
import { updateProducts } from "../actions/update-product.actions";

interface EditProductsFormProps {
  data: ProductoForm;
  productId: ProductoForm["id"];
}

export default function EditProductsForm({
  data,
  productId,
}: EditProductsFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductoForm>({
    defaultValues: {
      id: data.id,
      nombre: data.nombre,
      organizacionId: data.organizacionId,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateProducts,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["getProducts"] });
      queryClient.invalidateQueries({ queryKey: ["editProduct", productId] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = async (formData: ProductoForm) => {
    const data = {
      productId,
      formData,
    };
    mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">
        Produto:{data.nombre}
      </h1>
      <p className="text-muted-foreground text-lg mt-2">
        Llena el siguiente formulario para editar un producto
      </p>

      <form
        onSubmit={handleSubmit(handleForm)}
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
            placeholder="Nombre Unidad de Medida"
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
          Guardar Cambios
        </button>
      </form>
    </div>
  );
}
