import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { type MateriaPrima } from "../schemas";

export default function CreateProductView() {
  const initialValues: MateriaPrima = {
    name: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MateriaPrima>({
    defaultValues: initialValues,
  });

  const onSubmit = (data) => {
    console.log(data);
    // Aquí haces tu mutate o post
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
