import {
  PencilIcon,
  TrashIcon,
  Package2,
  Hash,
  MoreHorizontal,
} from "lucide-react";
import type { SchemaMaterialList } from "../schemas";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ListMaterialProps {
  data: SchemaMaterialList[];
}

export default function ListMaterial({ data }: ListMaterialProps) {
  const navigate = useNavigate();

  if (!data || data.length === 0) {
    return (
      <Card className="shadow-lg border-0">
        <CardContent className="p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full flex items-center justify-center mb-6">
            <Package2 className="h-12 w-12 text-amber-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay materias primas registradas
          </h3>
          <p className="text-gray-500">
            Comienza agregando materias primas a tu inventario
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-700 text-white">
        <CardTitle className="flex items-center gap-2 text-xl">
          <Package2 className="h-6 w-6" />
          Inventario de Materias Primas
          <Badge
            variant="secondary"
            className="ml-auto bg-white/20 text-white border-white/30"
          >
            {data.length} {data.length === 1 ? "material" : "materiales"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    <Hash className="h-4 w-4 text-amber-600" />
                    ID
                  </div>
                </th>
                <th className="px-6 py-4 text-left">
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    <Package2 className="h-4 w-4 text-orange-600" />
                    Nombre del Material
                  </div>
                </th>
                <th className="px-6 py-4 text-center">
                  <div className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Acciones
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.map((material, index) => {
                const isEven = index % 2 === 0;

                return (
                  <tr
                    key={material.id}
                    className={`hover:bg-amber-50 transition-colors duration-150 ${
                      isEven ? "bg-white" : "bg-gray-50/50"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-8 bg-gradient-to-b from-amber-500 to-orange-600 rounded-full" />
                        <div>
                          <Badge
                            variant="secondary"
                            className="bg-amber-100 text-amber-800 font-mono text-xs"
                          >
                            #{material.id}
                          </Badge>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex items-center justify-center">
                          <Package2 className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {material.nombre}
                          </p>
                          <p className="text-xs text-gray-500">
                            Materia prima registrada
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        {/* Desktop buttons */}
                        <div className="hidden sm:flex gap-2">
                          <Button
                            onClick={() =>
                              navigate(`/material/edit/${material.id}`)
                            }
                            size="sm"
                            variant="outline"
                            className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                          >
                            <PencilIcon className="w-4 h-4 mr-1" />
                            Editar
                          </Button>
                          <Button
                            onClick={() => {}}
                            size="sm"
                            variant="outline"
                            className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                          >
                            <TrashIcon className="w-4 h-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>

                        {/* Mobile dropdown */}
                        <div className="sm:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0"
                              >
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40">
                              <DropdownMenuItem
                                onClick={() =>
                                  navigate(`/material/edit/${material.id}`)
                                }
                                className="hover:bg-blue-50"
                              >
                                <PencilIcon className="mr-2 h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {}}
                                className="hover:bg-red-50 text-red-600"
                              >
                                <TrashIcon className="mr-2 h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
