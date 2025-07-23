"use client";

import { Link } from "react-router-dom";
import ListMaterial from "../components/ListMaterial";
import { useQuery } from "@tanstack/react-query";
import { getMateriaPrimas } from "../actions/get-materials.actions";
import SpinnerShared from "@/components/shared/spinner/SpinnerShared";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Package2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function MateriaPrimaView() {
  const { data, isLoading } = useQuery({
    queryKey: ["materiasPrimas"],
    queryFn: getMateriaPrimas,
  });

  if (isLoading) return <SpinnerShared />;

  if (data)
    return (
      <div className="space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600/5 via-orange-600/5 to-red-600/5 rounded-2xl -z-10" />

          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500" />

            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left side - Title and description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-lg">
                      <Package2 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-amber-800 to-orange-800 bg-clip-text text-transparent">
                        Materias Primas
                      </h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className="bg-amber-100 text-amber-800"
                        >
                          Insumos Principales
                        </Badge>
                        {data?.length && (
                          <Badge
                            variant="secondary"
                            className="bg-orange-100 text-orange-800"
                          >
                            {data.length}{" "}
                            {data.length === 1 ? "material" : "materiales"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    Controla y administra todas tus materias primas
                  </p>
                </div>

                {/* Right side - Action button */}
                <div className="flex flex-col items-center lg:items-end gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-6 text-lg font-semibold"
                  >
                    <Link
                      to="/material/create"
                      className="flex items-center gap-3"
                    >
                      <Plus className="h-6 w-6" />
                      Nueva Materia Prima
                    </Link>
                  </Button>

                  <p className="text-sm text-gray-500 text-center lg:text-right">
                    Registra nuevos materiales
                    <br />
                    para tu producción
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {data.length ? (
            <ListMaterial data={data} />
          ) : (
            <Card className="shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
                  <Package2 className="h-12 w-12 text-amber-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¡Registra tu primera materia prima!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  No tienes materias primas registradas. Comienza agregando los
                  materiales esenciales para tu proceso productivo.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Link
                    to="/material/create"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-5 w-5" />
                    Registrar Primera Materia Prima
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
}
