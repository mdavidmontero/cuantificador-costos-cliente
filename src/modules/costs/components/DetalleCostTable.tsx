import type {
  CostosGenerale,
  CostosIndirectosFabricacion,
  ServicioPublico,
} from "../schemas";
import { formattCurrency } from "@/lib";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Package2, Hash, DollarSign, Calculator } from "lucide-react";

type DetalleCosto =
  | CostosGenerale
  | CostosIndirectosFabricacion
  | ServicioPublico;

interface Props {
  title: string;
  data: DetalleCosto[];
}

function getNombre(item: DetalleCosto) {
  if ("name" in item && item.name) return item.name;
  return item.nombre;
}

function getCantidad(item: DetalleCosto) {
  return "cantidad" in item ? item.cantidad : "—";
}

function getCosto(item: DetalleCosto) {
  if ("costoTotal" in item) return item.costoTotal;
  if ("valorTotal" in item) return item.valorTotal;
  if ("porcentaje" in item) return item.porcentaje; // Para servicios públicos
  return 0;
}

function formatearValor(item: DetalleCosto) {
  if ("porcentaje" in item) {
    return `${item.porcentaje.toFixed(2)}%`;
  }
  return formattCurrency(getCosto(item));
}

function calcularTotal(data: DetalleCosto[], title: string) {
  if (title === "Servicios Públicos") {
    // Para servicios públicos, no sumamos porcentajes
    return null;
  }
  return data.reduce((acc, item) => acc + getCosto(item), 0);
}

function formatearTotal(total: number | null) {
  if (total === null) {
    return "N/A";
  }
  return formattCurrency(total);
}

// Función para obtener el color del tema basado en el título
function getThemeColor(title: string) {
  const colorMap: Record<
    string,
    { bg: string; border: string; text: string; icon: string }
  > = {
    "Materia Prima Directa": {
      bg: "from-blue-600 to-blue-700",
      border: "border-blue-200",
      text: "text-blue-900",
      icon: "text-blue-600",
    },
    "Mano de Obra Directa": {
      bg: "from-green-600 to-green-700",
      border: "border-green-200",
      text: "text-green-900",
      icon: "text-green-600",
    },
    "Mano de Obra Indirecta": {
      bg: "from-purple-600 to-purple-700",
      border: "border-purple-200",
      text: "text-purple-900",
      icon: "text-purple-600",
    },
    "Costos Indirectos de Fabricación": {
      bg: "from-orange-600 to-orange-700",
      border: "border-orange-200",
      text: "text-orange-900",
      icon: "text-orange-600",
    },
    "Costos Generales": {
      bg: "from-teal-600 to-teal-700",
      border: "border-teal-200",
      text: "text-teal-900",
      icon: "text-teal-600",
    },
    "Gastos de Venta": {
      bg: "from-rose-600 to-rose-700",
      border: "border-rose-200",
      text: "text-rose-900",
      icon: "text-rose-600",
    },
    "Servicios Públicos": {
      bg: "from-indigo-600 to-indigo-700",
      border: "border-indigo-200",
      text: "text-indigo-900",
      icon: "text-indigo-600",
    },
  };

  return (
    colorMap[title] || {
      bg: "from-gray-600 to-gray-700",
      border: "border-gray-200",
      text: "text-gray-900",
      icon: "text-gray-600",
    }
  );
}

export default function DetalleCostoTable({ title, data }: Props) {
  if (!data || data.length === 0) {
    return (
      <Card className="shadow-lg border-0">
        <CardHeader
          className={`bg-gradient-to-r ${
            getThemeColor(title).bg
          } text-white rounded-t-lg`}
        >
          <CardTitle className="flex items-center gap-2 text-lg">
            <Package2 className="h-5 w-5" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center py-8">
            <Package2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">
              No hay datos disponibles
            </p>
            <p className="text-gray-400 text-sm">
              No se encontraron registros para esta categoría
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalGeneral = calcularTotal(data, title);
  const themeColors = getThemeColor(title);

  return (
    <Card className="shadow-lg border-0 overflow-hidden">
      <CardHeader className={`bg-gradient-to-r ${themeColors.bg} text-white`}>
        <CardTitle className="flex items-center justify-between text-lg">
          <div className="flex items-center gap-2">
            <Package2 className="h-5 w-5" />
            {title}
          </div>
          <Badge
            variant="secondary"
            className="bg-white/20 text-white border-white/30"
          >
            {data.length} {data.length === 1 ? "elemento" : "elementos"}
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
                    <Package2 className={`h-4 w-4 ${themeColors.icon}`} />
                    Concepto
                  </div>
                </th>
                <th className="px-6 py-4 text-center">
                  <div className="flex items-center justify-center gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    <Hash className={`h-4 w-4 ${themeColors.icon}`} />
                    Cantidad
                  </div>
                </th>
                <th className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    <DollarSign className={`h-4 w-4 ${themeColors.icon}`} />
                    Valor Total
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.map((item, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div
                        className={`w-2 h-8 ${themeColors.bg} bg-gradient-to-b rounded-full mr-3`}
                      ></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {getNombre(item)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {getCantidad(item)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-sm font-semibold text-gray-900">
                      {formatearValor(item)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Separator />

        {/* Total Section */}
        <div className={`bg-gradient-to-r ${themeColors.bg} p-6`}>
          <div className="flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <Calculator className="h-5 w-5" />
              <span className="text-lg font-semibold">Total {title}</span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {formatearTotal(totalGeneral)}
              </p>
              <p className="text-sm opacity-90">
                Suma de {data.length}{" "}
                {data.length === 1 ? "concepto" : "conceptos"}
              </p>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="bg-gray-50 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <p className="text-gray-500 font-medium">Promedio por Concepto</p>
              <p className={`font-semibold ${themeColors.text}`}>
                {totalGeneral !== null
                  ? formattCurrency(totalGeneral / data.length)
                  : "N/A"}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 font-medium">Concepto Mayor</p>
              <p className={`font-semibold ${themeColors.text}`}>
                {title === "Servicios Públicos"
                  ? `${Math.max(...data.map((item) => getCosto(item))).toFixed(
                      2
                    )}%`
                  : formattCurrency(
                      Math.max(...data.map((item) => getCosto(item)))
                    )}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-500 font-medium">Concepto Menor</p>
              <p className={`font-semibold ${themeColors.text}`}>
                {title === "Servicios Públicos"
                  ? `${Math.min(...data.map((item) => getCosto(item))).toFixed(
                      2
                    )}%`
                  : formattCurrency(
                      Math.min(...data.map((item) => getCosto(item)))
                    )}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
