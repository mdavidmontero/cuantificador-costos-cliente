"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCostById } from "../actions/get-cost-by-id";
import { formattCurrency, formattDate } from "@/lib";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import DetalleCostoTable from "../components/DetalleCostTable";
import {
  Calendar,
  Package,
  Building2,
  Ruler,
  TrendingUp,
  DollarSign,
  Calculator,
  Target,
  Percent,
  PiggyBank,
  Receipt,
  CreditCard,
  Banknote,
  TrendingDown,
} from "lucide-react";

export default function CostDetailView() {
  const { id } = useParams();
  const costId = id!;

  const { data, isLoading } = useQuery({
    queryKey: ["getCostsById", costId],
    queryFn: () => getCostById(costId),
  });

  if (isLoading || !data) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-12 w-full" />
        <div className="grid gap-6">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  const {
    date,
    unidadMedida,
    cantidadProducida,
    perdidasEstimadas,
    cantidadesFinales,
    producto,
    organization,
    costoProduccion,
    materiaPrimaDirecta = [],
    manoObraDirecta = [],
    manoObraIndirecta = [],
    costosIndirectosFabricacion = [],
    costosGenerales = [],
    gastosVentas = [],
    serviciosPublicos = [],
  } = data;

  return (
    <div className="container mx-auto p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
          Análisis de Costos de Producción
        </h1>
        <p className="text-gray-600 text-lg">
          Reporte detallado de estructura de costos
        </p>
      </div>

      {/* Información General */}
      <Card className="shadow-lg border-0">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2 text-xl">
            <Building2 className="h-5 w-5" />
            Información General del Producto
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Fecha</p>
                <p className="text-gray-900 font-semibold">
                  {formattDate(date.toString())}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Package className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">Producto</p>
                <p className="text-gray-900 font-semibold">
                  {producto?.nombre ?? "Sin producto"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Building2 className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Organización
                </p>
                <p className="text-gray-900 font-semibold">
                  {organization?.name ?? "—"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Ruler className="h-5 w-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Unidad de Medida
                </p>
                <p className="text-gray-900 font-semibold">{unidadMedida}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-teal-100 rounded-lg">
                <TrendingUp className="h-5 w-5 text-teal-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Cantidad Producida
                </p>
                <p className="text-gray-900 font-semibold">
                  {cantidadProducida.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <Target className="h-5 w-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Pérdidas Estimadas
                </p>
                <p className="text-gray-900 font-semibold">
                  {perdidasEstimadas.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm text-gray-500 font-medium mb-1">
                Cantidades Finales
              </p>
              <Badge variant="secondary" className="text-lg px-4 py-2">
                {cantidadesFinales.toLocaleString()} unidades
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Consolidado de Costos */}
      {costoProduccion && (
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Calculator className="h-5 w-5" />
              Consolidado Financiero
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <DollarSign className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-800">
                    Costos de Operación
                  </p>
                </div>
                <p className="text-2xl font-bold text-blue-900">
                  {formattCurrency(costoProduccion.totalCostosOperacion)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-purple-600" />
                  <p className="text-sm font-medium text-purple-800">
                    Gastos de Mercadeo
                  </p>
                </div>
                <p className="text-2xl font-bold text-purple-900">
                  {costoProduccion.totalGastosMercadeo != null
                    ? formattCurrency(costoProduccion.totalGastosMercadeo)
                    : "—"}
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
                <div className="flex items-center gap-2 mb-2">
                  <Package className="h-4 w-4 text-orange-600" />
                  <p className="text-sm font-medium text-orange-800">
                    Gastos de Producción
                  </p>
                </div>
                <p className="text-2xl font-bold text-orange-900">
                  {formattCurrency(costoProduccion.totalGastosProduccion)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-teal-50 to-teal-100 p-4 rounded-lg border border-teal-200">
                <div className="flex items-center gap-2 mb-2">
                  <Calculator className="h-4 w-4 text-teal-600" />
                  <p className="text-sm font-medium text-teal-800">
                    Costo Unitario
                  </p>
                </div>
                <p className="text-2xl font-bold text-teal-900">
                  {formattCurrency(
                    costoProduccion.totalCostoProduccionUnitario
                  )}
                </p>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="h-4 w-4 text-green-600" />
                  <p className="text-sm font-medium text-green-800">
                    Precio Venta Unitario
                  </p>
                </div>
                <p className="text-2xl font-bold text-green-900">
                  {formattCurrency(costoProduccion.precioVentaUnitario)}
                </p>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <Percent className="h-4 w-4 text-emerald-600" />
                  <p className="text-sm font-medium text-emerald-800">
                    Margen de Utilidad
                  </p>
                </div>
                <p className="text-2xl font-bold text-emerald-900">
                  {costoProduccion.margenUtilidadUnitario.toFixed(2)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Análisis de Márgenes y Costos Adicionales */}
      {costoProduccion && (
        <Card className="shadow-lg border-0">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2 text-xl">
              <PiggyBank className="h-5 w-5" />
              Análisis de Márgenes y Costos Adicionales
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {costoProduccion.margenDeseado != null && (
                <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 p-4 rounded-lg border border-cyan-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-cyan-600" />
                    <p className="text-sm font-medium text-cyan-800">
                      Margen Deseado
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-cyan-900">
                    {costoProduccion.margenDeseado.toFixed(2)}%
                  </p>
                </div>
              )}

              {costoProduccion.precioCalculado != null && (
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="h-4 w-4 text-purple-600" />
                    <p className="text-sm font-medium text-purple-800">
                      Precio Calculado
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">
                    {formattCurrency(costoProduccion.precioCalculado)}
                  </p>
                  {costoProduccion.margenDeseado != null && (
                    <p className="text-xs text-purple-600 mt-1">
                      Basado en margen deseado del {costoProduccion.margenDeseado.toFixed(2)}%
                    </p>
                  )}
                </div>
              )}

              {costoProduccion.impuestos != null && (
                <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Receipt className="h-4 w-4 text-red-600" />
                    <p className="text-sm font-medium text-red-800">
                      Impuestos
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-red-900">
                    {costoProduccion.impuestos.toFixed(2)}%
                  </p>
                </div>
              )}

              {costoProduccion.costosFinancieros != null && (
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-yellow-600" />
                    <p className="text-sm font-medium text-yellow-800">
                      Costos Financieros
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-yellow-900">
                    {costoProduccion.costosFinancieros.toFixed(2)}%
                  </p>
                </div>
              )}

              {costoProduccion.otrosGastos != null && (
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-4 rounded-lg border border-pink-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="h-4 w-4 text-pink-600" />
                    <p className="text-sm font-medium text-pink-800">
                      Otros Gastos
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-pink-900">
                    {costoProduccion.otrosGastos.toFixed(2)}%
                  </p>
                </div>
              )}

              {costoProduccion.margenUtilidadNeto != null && (
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-4 rounded-lg border border-emerald-200">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingDown className="h-4 w-4 text-emerald-600" />
                    <p className="text-sm font-medium text-emerald-800">
                      Margen Utilidad Neto
                    </p>
                  </div>
                  <p className="text-2xl font-bold text-emerald-900">
                    {costoProduccion.margenUtilidadNeto.toFixed(2)}%
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tablas Detalladas */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
          Desglose Detallado de Costos
        </h2>

        <div className="grid gap-6">
          <DetalleCostoTable
            title="Materia Prima Directa"
            data={materiaPrimaDirecta}
          />
          <DetalleCostoTable
            title="Mano de Obra Directa"
            data={manoObraDirecta}
          />
          <DetalleCostoTable
            title="Mano de Obra Indirecta"
            data={manoObraIndirecta}
          />
          <DetalleCostoTable
            title="Costos Indirectos de Fabricación"
            data={costosIndirectosFabricacion}
          />
          {serviciosPublicos.length > 0 && (
            <DetalleCostoTable
              title="Servicios Públicos"
              data={serviciosPublicos}
            />
          )}
          <DetalleCostoTable title="Costos Generales" data={costosGenerales} />
          <DetalleCostoTable title="Gastos de Venta" data={gastosVentas} />
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-8 border-t border-gray-200">
        <p className="text-gray-500 text-sm">
          Reporte generado el{" "}
          {new Date().toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
