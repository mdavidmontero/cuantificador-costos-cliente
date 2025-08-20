"use client";

import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import { getCostsAll } from "../actions/get-cost-by-id";
import ListCost from "../components/LisCost";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Calculator } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function CalculateCostsView() {
  const { data, isLoading } = useQuery({
    queryKey: ["getCostsAll"],
    queryFn: getCostsAll,
  });

  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-teal-600/5 rounded-2xl -z-10" />

        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-teal-500" />

          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                    <Calculator className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                      Análisis de Costos
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="secondary"
                        className="bg-blue-100 text-blue-800"
                      >
                        Sistema Profesional
                      </Badge>
                      {data?.length && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          {data.length}{" "}
                          {data.length === 1 ? "registro" : "registros"}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                  Cuantifica y analiza tus costos de producción por producto
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-6 text-lg font-semibold"
                >
                  <Link to="/costs/create" className="flex items-center gap-3">
                    <Plus className="h-6 w-6" />
                    Nuevo Análisis de Costos
                  </Link>
                </Button>

                <p className="text-sm text-gray-500 text-center lg:text-right">
                  Crea un análisis detallado de costos
                  <br />
                  para optimizar tu producción
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {isLoading ? (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">Cargando análisis de costos...</p>
            </CardContent>
          </Card>
        ) : data?.length ? (
          <>
            <ListCost data={data || []} />

            {/* <div className="mt-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-teal-600 rounded-lg shadow-md">
                  <LineChart className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Evolución Histórica</h2>
              </div>
              <HistoricoCostosPrecios />
            </div> */}
          </>
        ) : (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                <Calculator className="h-12 w-12 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ¡Comienza tu primer análisis!
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                No tienes análisis de costos registrados. Crea tu primer
                análisis para comenzar a optimizar la rentabilidad de tus
                productos.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link to="/costs/create" className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Crear Primer Análisis
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
