import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import type { EditMaterialForm } from "../schemas";
import { updateMateriaPrima } from "../actions/update-material.actions";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import ErrorMessage from "@/components/shared/ErrorMessage";

interface EditMaterialFormProps {
  data: EditMaterialForm;
  materialId: EditMaterialForm["id"];
}

export default function EditMaterialForm({
  data,
  materialId,
}: EditMaterialFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMaterialForm>({
    defaultValues: {
      id: data.id,
      nombre: data.nombre,
      organizacionId: data.organizacionId,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateMateriaPrima,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["materiasPrimas"] });
      queryClient.invalidateQueries({ queryKey: ["editMaterial", materialId] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = async (formData: EditMaterialForm) => {
    const data = {
      materialId,
      formData,
    };
    mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">Materia Prima</h1>
      <p className="text-muted-foreground text-lg mt-2">
        Llena el siguiente formulario para editar una materia prima.
      </p>

      <form
        onSubmit={handleSubmit(handleForm)}
        className="mt-10 bg-white shadow-lg p-10 rounded-lg"
      >
        <div className="space-y-3 mb-5">
          <label
            htmlFor="nombre"
            className="block mb-1 text-sm font-medium text-gray-700"
          >
            Nombre
          </label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre Materia Prima"
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
