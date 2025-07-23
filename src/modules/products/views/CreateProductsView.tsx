"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import type { productSchemaFormData } from "../schemas";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import ErrorMessage from "@/components/shared/ErrorMessage";
import { createProduct } from "../actions/create-product.actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Package, Save, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CreateProductsView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const initialValues: productSchemaFormData = {
    nombre: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<productSchemaFormData>({
    defaultValues: initialValues,
  });

  const { mutate, isPending } = useMutation({
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

  const isLoading = isSubmitting || isPending;

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-emerald-600/5 to-teal-600/5 rounded-2xl -z-10" />

        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

          <div className="p-8">
            <div className="flex items-center gap-4 mb-6">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate(-1)}
                className="hover:bg-green-50 hover:text-green-700 transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Volver
              </Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
                  Nuevo Producto
                </h1>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="secondary"
                    className="bg-green-100 text-green-800"
                  >
                    Catálogo Principal
                  </Badge>
                </div>
                <p className="text-gray-600 mt-3 text-lg">
                  Completa la información para agregar un nuevo producto a tu
                  catálogo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <Card className="shadow-lg border-0 overflow-hidden max-w-2xl mx-auto">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 border-b border-green-100">
          <CardTitle className="flex items-center gap-2 text-xl text-gray-800">
            <Package className="h-5 w-5 text-green-600" />
            Información del Producto
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Name Field */}
            <div className="space-y-3">
              <Label
                htmlFor="nombre"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <Package className="h-4 w-4 text-green-600" />
                Nombre del Producto
                <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  id="nombre"
                  type="text"
                  placeholder="Nombre descriptivo del producto producido"
                  {...register("nombre", {
                    required: "El nombre es obligatorio",
                  })}
                  className={`text-base py-3 px-4 border-2 transition-all duration-200 ${
                    errors.nombre
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-green-400 focus:ring-green-100"
                  }`}
                  disabled={isLoading}
                />
                {errors.nombre && (
                  <div className="absolute -bottom-6 left-0">
                    <ErrorMessage>{errors.nombre.message}</ErrorMessage>
                  </div>
                )}
              </div>
            </div>

            {/* Helper Text */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Package className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-green-800 mb-1">
                    Consejos para el registro
                  </h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Usa nombres claros y descriptivos</li>
                    <li>
                      • Incluye marca, modelo o características distintivas
                    </li>
                    <li>• Evita abreviaciones confusas</li>
                    <li>• Mantén consistencia en la nomenclatura</li>
                  </ul>
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
                className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Guardando...
                  </>
                ) : (
                  <>
                    <Save className="h-5 w-5 mr-2" />
                    Guardar Producto
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
