"use client";

import {
  TrashIcon,
  EyeIcon,
  Calendar,
  Package,
  TrendingUp,
  DollarSign,
  Percent,
} from "lucide-react";
import type { CostoProduccionSchema, SchemaCost } from "../schemas";
import { formattCurrency, formattDate } from "@/lib";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCost } from "../actions/delete-cost.actions";
import { toast } from "sonner";
import { ModalConfirmCost } from "./DeleteModalCost";

interface ListCostProps {
  data: SchemaCost[];
}

export default function ListCost({ data }: ListCostProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const deleteCostMutation = useMutation({
    mutationFn: deleteCost,
    onSuccess: (data) => {
      toast.success(data);
      queryClient.invalidateQueries({ queryKey: ["getCostsAll"] });
      navigate("/costs");
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });

  const deleteMutationCost = (id: CostoProduccionSchema["id"]) => {
    deleteCostMutation.mutate(id);
  };

  if (!data || data.length === 0) {
    return (
      <Card className="shadow-lg border-0">
        <CardContent className="p-12 text-center">
          <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Package className="h-12 w-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No hay registros de costos
          </h3>
          <p className="text-gray-500">
            Comienza creando tu primer análisis de costos
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          <CardTitle className="flex items-center gap-2 text-xl">
            <TrendingUp className="h-6 w-6" />
            Registro de Análisis de Costos
            <Badge
              variant="secondary"
              className="ml-auto bg-white/20 text-white border-white/30"
            >
              {data.length} {data.length === 1 ? "registro" : "registros"}
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
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Fecha
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left">
                    <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      <Package className="h-4 w-4 text-green-600" />
                      Producto
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      Cantidad
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      <DollarSign className="h-4 w-4 text-blue-600" />
                      C. Operación
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      <DollarSign className="h-4 w-4 text-purple-600" />
                      G. Mercadeo
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      <DollarSign className="h-4 w-4 text-orange-600" />
                      G. Producción
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      <DollarSign className="h-4 w-4 text-teal-600" />
                      C. Unitario
                    </div>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      P. Venta
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                      <Percent className="h-4 w-4 text-emerald-600" />% Utilidad
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
                {data.map((registro, index) => {
                  const costo = registro.costoProduccion;
                  const isEven = index % 2 === 0;

                  return (
                    <tr
                      key={registro.id}
                      className={`hover:bg-blue-50 transition-colors duration-150 ${
                        isEven ? "bg-white" : "bg-gray-50/50"
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-8 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full" />
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              {formattDate(registro.date?.toString() ?? "")}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                            <Package className="h-4 w-4 text-green-600" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">
                            {registro.producto?.nombre || "—"}
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-center">
                        <Badge
                          variant="secondary"
                          className="bg-purple-100 text-purple-800"
                        >
                          {registro.cantidadProducida ?? "—"}
                        </Badge>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          {costo?.totalCostosOperacion != null
                            ? formattCurrency(costo.totalCostosOperacion)
                            : "—"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          {costo?.totalGastosMercadeo != null
                            ? formattCurrency(costo.totalGastosMercadeo)
                            : "—"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-gray-900">
                          {costo?.totalGastosProduccion != null
                            ? formattCurrency(costo.totalGastosProduccion)
                            : "—"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-teal-700">
                          {costo?.totalCostoProduccionUnitario != null
                            ? formattCurrency(
                                costo.totalCostoProduccionUnitario
                              )
                            : "—"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-right">
                        <span className="text-sm font-semibold text-green-700">
                          {costo?.precioVentaUnitario != null
                            ? formattCurrency(costo.precioVentaUnitario)
                            : "—"}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {costo?.margenUtilidadUnitario != null ? (
                          <Badge
                            variant="secondary"
                            className={`${
                              costo.margenUtilidadUnitario > 20
                                ? "bg-green-100 text-green-800"
                                : costo.margenUtilidadUnitario > 10
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {costo.margenUtilidadUnitario.toFixed(2)}%
                          </Badge>
                        ) : (
                          "—"
                        )}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            onClick={() => navigate(`/costs/${registro.id}`)}
                            size="sm"
                            variant="outline"
                            className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-colors"
                          >
                            <EyeIcon className="w-4 h-4 mr-1" />
                            Ver
                          </Button>
                          <ModalConfirmCost
                            handleDeleteCost={deleteMutationCost}
                          >
                            <Button
                              onClick={() =>
                                navigate(
                                  location.pathname +
                                    `?handleDelete=${registro.id}`
                                )
                              }
                              size="sm"
                              variant="outline"
                              className="hover:bg-red-50 hover:border-red-300 hover:text-red-700 transition-colors"
                            >
                              <TrashIcon className="w-4 h-4 mr-1" />
                              Eliminar
                            </Button>
                          </ModalConfirmCost>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Footer con estadísticas */}
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Total de registros: {data.length}</span>
              <span>
                Última actualización: {new Date().toLocaleDateString("es-ES")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
