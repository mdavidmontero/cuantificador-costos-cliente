"use client";

import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import ErrorMessage from "@/components/shared/ErrorMessage";
import type { MateriaPrimaForm } from "../schemas";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { createMateriaPrima } from "../actions/create-material.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Package2, Save, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CreateMaterialView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialValues: MateriaPrimaForm = {
    name: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<MateriaPrimaForm>({
    defaultValues: initialValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createMateriaPrima,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["materiasPrimas"] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: MateriaPrimaForm) => {
    mutate(formData);
  };

  const isLoading = isSubmitting || isPending;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-orange-600/5 to-red-600/5 rounded-2xl -z-10" />

        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-amber-50 hover:text-amber-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                <Package2 className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-orange-800 bg-clip-text text-transparent">
                  Nueva Materia Prima
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-amber-100 text-amber-800"
                  >
                    Registro de Insumos
                  </Badge>
                </div>
                <p className="text-gray-600 mt-3 text-lg">
                  Completa la información para registrar una nueva materia prima
                  en tu inventario
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <Card className="shadow-lg border-0 overflow-hidden max-w-2xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <Package2 className="h-5 w-5 text-amber-600" />
            Información de la Materia Prima
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Field */}
            <div className="space-y-3">
              <Label
                htmlFor="name"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <Package2 className="h-4 w-4 text-amber-600" />
                Nombre de la Materia Prima
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Ej: Harina de trigo, Azúcar refinada, Aceite vegetal..."
                  {...register("name", {
                    required: "El nombre es obligatorio",
                  })}
                  className={`text-base py-3 px-4 border-2 transition-all duration-200 ${
                    errors.name
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-amber-400 focus:ring-amber-100"
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

            {/* Action Buttons */}
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
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Guardar Materia Prima
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
