"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Building,
  FileText,
  UserPlus,
  Loader2,
} from "lucide-react";
import type { RegisterFormData } from "../types";
import { useMutation } from "@tanstack/react-query";
import { createAccount } from "../actions/create-account.actions";
import { toast } from "sonner";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const password = watch("password");

  const { mutate, isPending } = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      toast.success("Cuenta creada correctamente");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onSubmit = async (formData: RegisterFormData) => {
    mutate(formData);
  };

  return (
    <div className="space-y-6">
      {/* Mobile Logo */}
      <div className="lg:hidden text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="p-2 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg">
            <UserPlus className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CostManager
          </span>
        </div>
      </div>

      <Card className="shadow-2xl border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center">
          <CardTitle className="text-2xl font-bold">Crear Cuenta</CardTitle>
          <p className="text-green-100">Registra tu empresa y comienza</p>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <User className="h-4 w-4 text-blue-600" />
                Nombre Completo
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Juan Pérez"
                {...register("name", {
                  required: "El nombre es obligatorio",
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener al menos 2 caracteres",
                  },
                })}
                className={`text-base py-3 px-4 border-2 transition-all duration-200 ${
                  errors.name
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-green-400 focus:ring-green-100"
                }`}
                disabled={isPending}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <Mail className="h-4 w-4 text-blue-600" />
                Correo Electrónico
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="juan@empresa.com"
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
                    : "border-gray-200 focus:border-green-400 focus:ring-green-100"
                }`}
                disabled={isPending}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Organization Name */}
            <div className="space-y-2">
              <Label
                htmlFor="nameOrganization"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <Building className="h-4 w-4 text-blue-600" />
                Nombre de la Organización
              </Label>
              <Input
                id="nameOrganization"
                type="text"
                placeholder="Mi Empresa S.A.S"
                {...register("nameOrganization", {
                  required: "El nombre de la organización es obligatorio",
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener al menos 2 caracteres",
                  },
                })}
                className={`text-base py-3 px-4 border-2 transition-all duration-200 ${
                  errors.nameOrganization
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-green-400 focus:ring-green-100"
                }`}
                disabled={isPending}
              />
              {errors.nameOrganization && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.nameOrganization.message}
                </p>
              )}
            </div>

            {/* NIT */}
            <div className="space-y-2">
              <Label
                htmlFor="nit"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <FileText className="h-4 w-4 text-blue-600" />
                NIT
              </Label>
              <Input
                id="nit"
                type="text"
                placeholder="123456789-0"
                {...register("nit", {
                  required: "El NIT es obligatorio",
                  minLength: {
                    value: 6,
                    message: "El NIT debe tener al menos 6 caracteres",
                  },
                })}
                className={`text-base py-3 px-4 border-2 transition-all duration-200 ${
                  errors.nit
                    ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                    : "border-gray-200 focus:border-green-400 focus:ring-green-100"
                }`}
                disabled={isPending}
              />
              {errors.nit && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.nit.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <Lock className="h-4 w-4 text-blue-600" />
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password", {
                    required: "La contraseña es obligatoria",
                    minLength: {
                      value: 8,
                      message: "La contraseña debe tener al menos 8 caracteres",
                    },
                  })}
                  className={`text-base py-3 px-4 pr-12 border-2 transition-all duration-200 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-green-400 focus:ring-green-100"
                  }`}
                  disabled={isPending}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isPending}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="password_confirmation"
                className="text-base font-semibold text-gray-700 flex items-center gap-2"
              >
                <Lock className="h-4 w-4 text-blue-600" />
                Confirmar Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password_confirmation"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  {...register("password_confirmation", {
                    required: "Debes confirmar la contraseña",
                    validate: (value) =>
                      value === password || "Las contraseñas no coinciden",
                  })}
                  className={`text-base py-3 px-4 pr-12 border-2 transition-all duration-200 ${
                    errors.password_confirmation
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:border-green-400 focus:ring-green-100"
                  }`}
                  disabled={isPending}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isPending}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                </Button>
              </div>
              {errors.password_confirmation && (
                <p className="text-red-600 text-sm mt-1">
                  {errors.password_confirmation.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isPending}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                  Creando cuenta...
                </>
              ) : (
                <>
                  <UserPlus className="h-5 w-5 mr-2" />
                  Crear Cuenta
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Login Link */}
      <div className="text-center">
        <p className="text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            to="/auth/login"
            className="text-blue-600 hover:text-blue-800 font-semibold hover:underline transition-colors"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
}
