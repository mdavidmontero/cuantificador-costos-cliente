import { useNavigate } from "react-router";
import type { MeasurementForm } from "../schemas";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUnit } from "../actions/update-units.actions";
import { toast } from "sonner";
import ErrorMessage from "@/components/shared/ErrorMessage";

interface EditUnitFormProps {
  data: MeasurementForm;
  unitId: MeasurementForm["id"];
}

export default function EditUnitForm({ data, unitId }: EditUnitFormProps) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MeasurementForm>({
    defaultValues: {
      id: data.id,
      name: data.name,
      organizationId: data.organizationId,
    },
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateUnit,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["getUnitsMeasurements"] });
      queryClient.invalidateQueries({ queryKey: ["editUnit", unitId] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleForm = async (formData: MeasurementForm) => {
    const data = {
      unitId,
      formData,
    };
    mutate(data);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold tracking-tight">Unidad de Medida</h1>
      <p className="text-muted-foreground text-lg mt-2">
        Llena el siguiente formulario para editar una unidad de medida
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
            {...register("name", { required: "El nombre es obligatorio" })}
            className="w-full border border-gray-200  p-3 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
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
