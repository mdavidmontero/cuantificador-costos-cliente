import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUnits } from "../actions/get-units.actions";
import SpinnerShared from "@/components/shared/spinner/SpinnerShared";
import ListUnits from "../components/ListUnits";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Ruler } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function UnitsMeasurementView() {
  const { data, isLoading } = useQuery({
    queryKey: ["getUnitsMeasurements"],
    queryFn: getUnits,
  });

  if (isLoading) return <SpinnerShared />;

  if (data)
    return (
      <div className="space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-violet-600/5 to-indigo-600/5 rounded-2xl -z-10" />

          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500" />

            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left side - Title and description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg">
                      <Ruler className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent">
                        Unidades de Medida
                      </h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800"
                        >
                          Sistema de Medición
                        </Badge>
                        {data?.length && (
                          <Badge
                            variant="secondary"
                            className="bg-violet-100 text-violet-800"
                          >
                            {data.length}{" "}
                            {data.length === 1 ? "unidad" : "unidades"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    Define y administra las unidades de medida para estandarizar
                    tus procesos
                  </p>
                </div>

                {/* Right side - Action button */}
                <div className="flex flex-col items-center lg:items-end gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-6 text-lg font-semibold"
                  >
                    <Link
                      to="/units/create"
                      className="flex items-center gap-3"
                    >
                      <Plus className="h-6 w-6" />
                      Nueva Unidad de Medida
                    </Link>
                  </Button>

                  <p className="text-sm text-gray-500 text-center lg:text-right">
                    Define unidades personalizadas
                    <br />
                    para tus procesos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {data.length ? (
            <ListUnits data={data} />
          ) : (
            <Card className="shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center mb-6">
                  <Ruler className="h-12 w-12 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¡Define tu primera unidad de medida!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  No tienes unidades de medida registradas. Comienza definiendo
                  las unidades básicas para estandarizar tus procesos.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Link to="/units/create" className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Crear Primera Unidad
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
}
