import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { type MateriaPrimaForm } from "../schemas";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createMateriaPrima } from "../actions/create-material.actions";

export default function CreateProductView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const initialValues: MateriaPrimaForm = {
    name: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MateriaPrimaForm>({
    defaultValues: initialValues,
  });

  const { mutate } = useMutation({
    mutationFn: createMateriaPrima,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["getMateriaPrimas"] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: MateriaPrimaForm) => {
    mutate(formData);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">Materia Prima</h1>
      <p className="text-muted-foreground text-lg mt-2">
        Llena el siguiente formulario para agregar una nueva materia prima.
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
            placeholder="Nombre Materia Prima"
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full border border-gray-200  p-3 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
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
