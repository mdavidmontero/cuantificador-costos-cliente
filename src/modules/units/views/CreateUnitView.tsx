"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { unitSchemaFormData } from "../schemas";
import { createUnit } from "../actions/create-units.actions";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Ruler,
  Save,
  Loader2,
  Scale,
  Calculator,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CreateUnitView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialValues: unitSchemaFormData = {
    name: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<unitSchemaFormData>({
    defaultValues: initialValues,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createUnit,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["getUnitsMeasurements"] });
      navigate(-1);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = (formData: unitSchemaFormData) => {
    mutate(formData);
  };

  const isLoading = isSubmitting || isPending;

  return (
    <div className="space-y-8">
      {/* Header Section */}
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
                  Nueva Unidad de Medida
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-purple-100 text-purple-800"
                  >
                    Sistema de Medición
                  </Badge>
                </div>
                <p className="text-gray-600 mt-3 text-lg">
                  Define una nueva unidad de medida para estandarizar tus
                  procesos y cálculos
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <Card className="shadow-lg border-0 overflow-hidden max-w-2xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-violet-50 border-b border-purple-100">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <Ruler className="h-5 w-5 text-purple-600" />
            Información de la Unidad
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
                <Ruler className="h-4 w-4 text-purple-600" />
                Nombre de la Unidad
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="name"
                  type="text"
                  placeholder="Ej: Kilogramos, Litros, Metros, Unidades, Cajas..."
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
                  <div className="absolute -bottom-6 left-0">
                    <ErrorMessage>{errors.name.message}</ErrorMessage>
                  </div>
                )}
              </div>
            </div>

            {/* Helper Text */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Scale className="h-5 w-5 text-purple-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-purple-800 mb-1">
                    Consejos para definir unidades
                  </h4>
                  <ul className="text-sm text-purple-700 space-y-1">
                    <li>• Usa nombres estándar y reconocibles</li>
                    <li>• Define unidades específicas para tu industria</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Examples */}
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Calculator className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-indigo-800 mb-2">
                    Ejemplos comunes
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-indigo-700">
                    <div>• Peso: kg, g, lb, oz</div>
                    <div>• Volumen: L, ml, gal</div>
                    <div>• Longitud: m, cm, ft, in</div>
                    <div>• Cantidad: pcs, docenas</div>
                  </div>
                </div>
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
                    Guardar Unidad
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
