import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Plus, Ruler } from "lucide-react";
import { Link } from "react-router-dom";
import { getUsersOrganization } from "../actions/get-users-organization.actions";
import ListUser from "../components/ListUser";

export default function UsersView() {
  const { data } = useQuery({
    queryKey: ["getUsersAll"],
    queryFn: getUsersOrganization,
  });
  console.log(data);
  return (
    <div className="space-y-8">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 via-violet-600/5 to-indigo-600/5 rounded-2xl -z-10" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-500" />

          <div className="p-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg">
                    <Ruler className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent">
                      Usuarios
                    </h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800"
                      >
                        Usuarios Activos
                      </Badge>
                      {/* {data?.length && (
                          <Badge
                            variant="secondary"
                            className="bg-violet-100 text-violet-800"
                          >
                            {data.length}{" "}
                            {data.length === 1 ? "unidad" : "unidades"}
                          </Badge>
                        )} */}
                    </div>
                  </div>
                </div>

                <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                  Define y administra los usuarios que colaboran en el sistema
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-end gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-6 text-lg font-semibold"
                >
                  <Link to="/users/create" className="flex items-center gap-3">
                    <Plus className="h-6 w-6" />
                    Nuevo Usuario
                  </Link>
                </Button>

                <p className="text-sm text-gray-500 text-center lg:text-right">
                  Define los usuarios
                  <br />
                  que tendran acceso
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        {data?.length ? (
          <ListUser data={data} />
        ) : (
          <Card className="shadow-lg border-0">
            <CardContent className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-100 to-violet-100 rounded-full flex items-center justify-center mb-6">
                <Ruler className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Añade los usuarios que colaboran en el sistema
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                No tienes usuarios registrados. Crea tu primer usuario para que
                colaboren en el sistema.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Link to="/users/create" className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Crear Usuario
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
