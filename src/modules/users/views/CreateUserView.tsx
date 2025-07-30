import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Ruler, Save, User, UsersIcon } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import type { UserSchemaFormData } from "../schemas";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { createUserOrganization } from "../actions/create-user.actions";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateUserView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialValues = {
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role: "",
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<UserSchemaFormData>({
    defaultValues: initialValues,
  });
  const password = watch("password");

  const { mutate, isPending } = useMutation({
    mutationFn: createUserOrganization,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["getUsersAll"] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: UserSchemaFormData) => {
    console.log(formData);
    mutate(formData);
  };

  const isLoading = isSubmitting || isPending;

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-violet-600/5 to-indigo-600/5 rounded-2xl -z-10" />

        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500" />

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-purple-50 hover:text-purple-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg">
                <Ruler className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent">
                  Nuevo Usuario
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    usuarios del sistema
                  </Badge>
                </div>
                <p className="text-gray-600 mt-3 text-lg">
                  Define los usuarios que podran colaborar en el sistema
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Card className="shadow-lg border-0 overflow-hidden max-w-2xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <UsersIcon className="h-5 w-5 text-purple-600" />
            Información de los Usuarios
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-purple-600" />
                Nombre
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Ej: Juan Perez"
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  className={`text-base py-3 px-4 border-2 transition-all duration-200 ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-purple-400 focus:ring-purple-100"
                  }`}
                  disabled={isLoading}
                />
                {errors.name && (
                  <div className="p-2">
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="email"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-purple-600" />
                Correo Electrónico
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@empresa.com"
                  {...register("email", {
                    required: "El correo electrónico es obligatorio",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Correo electrónico inválido",
                    },
                  })}
                  className={`text-base py-3 px-4 border-2 transition-all duration-200 ${
                    errors.email
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-purple-400 focus:ring-purple-100"
                  }`}
                  disabled={isLoading}
                />
                {errors.email && (
                  <div className="p-2">
                    <ErrorMessage>{errors.email.message}</ErrorMessage>
                  </div>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-purple-600" />
                Contraseña
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                  className={`text-base py-3 px-4 border-2 transition-all duration-200 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-purple-400 focus:ring-purple-100"
                  }`}
                  disabled={isLoading}
                />
                {errors.password && (
                  <div className="p-2">
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="password_confirmation"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-purple-600" />
                Confirmar Contraseña
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="password_confirmation"
                  type="password"
                  placeholder="••••••••"
                  {...register("password_confirmation", {
                    required: "Debes confirmar la contraseña",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                  className={`text-base py-3 px-4 border-2 transition-all duration-200 ${
                    errors.password_confirmation
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-purple-400 focus:ring-purple-100"
                  }`}
                  disabled={isLoading}
                />
                {errors.password_confirmation && (
                  <div className="p-2">
                    <ErrorMessage>
                      {errors.password_confirmation.message}
                    </ErrorMessage>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="role"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-purple-600" />
                Rol
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Controller
                  name="role"
                  control={control}
                  rules={{ required: "El rol es obligatorio" }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Rol de usuario" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USER">User</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.role && (
                  <div className="p-2">
                    <ErrorMessage>{errors.role.message}</ErrorMessage>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate(-1)}
                disabled={isLoading}
                className="flex-1 py-3 text-base hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </Button>

              <Button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Guardar Usuario
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
