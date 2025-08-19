import { useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useQuery } from "@tanstack/react-query";
import { format, subMonths } from "date-fns";
import { es } from "date-fns/locale";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Función para obtener datos históricos
const fetchHistoricData = async (params: {
  startDate: string;
  endDate: string;
  modo: string;
  productoId?: string;
  tipoConsulta: string;
}) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append("startDate", params.startDate);
    queryParams.append("endDate", params.endDate);
    queryParams.append("modo", params.modo);
    queryParams.append("tipoConsulta", params.tipoConsulta);

    if (params.productoId) {
      queryParams.append("productoId", params.productoId);
    }

    const response = await fetch(
      `/api/costs/get-evolution-costs?${queryParams.toString()}`
    );
    if (!response.ok) {
      throw new Error("Error al obtener datos históricos");
    }
    return response.json();
  } catch (error) {
    console.error("Error al obtener datos históricos:", error);
    throw error;
  }
};

interface HistoricoCostosPreciosProps {
  productoId?: string;
}

export default function HistoricoCostosPrecios({
  productoId,
}: HistoricoCostosPreciosProps) {
  const [tipoConsulta, setTipoConsulta] = useState<"costos" | "precios">(
    "costos"
  );
  const [periodoTiempo, setPeriodoTiempo] = useState<"1m" | "3m" | "6m" | "1y">(
    "3m"
  );
  const [modoVisualizacion, setModoVisualizacion] = useState<"dia" | "semana">(
    "semana"
  );

  // Calcular fechas basadas en el periodo seleccionado
  const endDate = format(new Date(), "yyyy-MM-dd");
  const getStartDate = () => {
    const today = new Date();
    switch (periodoTiempo) {
      case "1m":
        return format(subMonths(today, 1), "yyyy-MM-dd");
      case "3m":
        return format(subMonths(today, 3), "yyyy-MM-dd");
      case "6m":
        return format(subMonths(today, 6), "yyyy-MM-dd");
      case "1y":
        return format(subMonths(today, 12), "yyyy-MM-dd");
      default:
        return format(subMonths(today, 3), "yyyy-MM-dd");
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: [
      "historicData",
      tipoConsulta,
      periodoTiempo,
      modoVisualizacion,
      productoId,
    ],
    queryFn: () =>
      fetchHistoricData({
        startDate: getStartDate(),
        endDate,
        modo: modoVisualizacion,
        productoId,
        tipoConsulta,
      }),
  });

  // Preparar datos para el gráfico
  const prepareChartData = () => {
    if (!data || !data.length) return null;

    const labels = data.map((item: any) =>
      format(new Date(item.fecha), "dd MMM", { locale: es })
    );

    if (tipoConsulta === "costos") {
      return {
        labels,
        datasets: [
          {
            label: "Costo Unitario",
            data: data.map((item: any) => item.costoUnitario || 0),
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };
    } else {
      return {
        labels,
        datasets: [
          {
            label: "Precio de Venta",
            data: data.map((item: any) => item.precioVenta || 0),
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgba(75, 192, 192, 0.5)",
          },
          {
            label: "Margen de Utilidad (%)",
            data: data.map((item: any) => item.margenUtilidad || item.margenUtilidadUnitario || 0),
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            yAxisID: "y1",
          },
        ],
      };
    }
  };

  const chartData = prepareChartData();

  // Opciones del gráfico
  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text:
          tipoConsulta === "costos"
            ? "Evolución de Costos"
            : "Evolución de Precios y Márgenes",
      },
    },
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: tipoConsulta === "costos" ? "Costo ($)" : "Precio ($)",
        },
      },
      y1: {
        type: "linear" as const,
        display: tipoConsulta === "precios",
        position: "right" as const,
        title: {
          display: true,
          text: "Margen (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-xl font-bold text-center text-gray-800 mb-6">
        Histórico de {tipoConsulta === "costos" ? "Costos" : "Precios"}
      </h3>

      <div className="flex flex-wrap gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo de Consulta
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setTipoConsulta("costos")}
              className={`px-4 py-2 text-sm rounded-md ${
                tipoConsulta === "costos"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Costos
            </button>
            <button
              type="button"
              onClick={() => setTipoConsulta("precios")}
              className={`px-4 py-2 text-sm rounded-md ${
                tipoConsulta === "precios"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Precios
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periodo
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setPeriodoTiempo("1m")}
              className={`px-3 py-2 text-sm rounded-md ${
                periodoTiempo === "1m"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              1 Mes
            </button>
            <button
              type="button"
              onClick={() => setPeriodoTiempo("3m")}
              className={`px-3 py-2 text-sm rounded-md ${
                periodoTiempo === "3m"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              3 Meses
            </button>
            <button
              type="button"
              onClick={() => setPeriodoTiempo("6m")}
              className={`px-3 py-2 text-sm rounded-md ${
                periodoTiempo === "6m"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              6 Meses
            </button>
            <button
              type="button"
              onClick={() => setPeriodoTiempo("1y")}
              className={`px-3 py-2 text-sm rounded-md ${
                periodoTiempo === "1y"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              1 Año
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Visualización
          </label>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => setModoVisualizacion("dia")}
              className={`px-4 py-2 text-sm rounded-md ${
                modoVisualizacion === "dia"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Diario
            </button>
            <button
              type="button"
              onClick={() => setModoVisualizacion("semana")}
              className={`px-4 py-2 text-sm rounded-md ${
                modoVisualizacion === "semana"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Semanal
            </button>
          </div>
        </div>
      </div>

      <div className="h-80">
        {isLoading && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">Cargando datos...</p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center h-full">
            <p className="text-red-500">Error al cargar los datos: {error instanceof Error ? error.message : 'Error desconocido'}</p>
          </div>
        )}

        {!isLoading && !error && chartData && (
          <Line options={options} data={chartData} />
        )}

        {!isLoading && !error && (!data || data.length === 0) && (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">
              No hay datos disponibles para el periodo seleccionado
            </p>
          </div>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 italic text-center">
        Los datos históricos permiten identificar tendencias y picos en{" "}
        {tipoConsulta === "costos" ? "costos" : "precios y márgenes"} para una
        mejor toma de decisiones.
      </div>
    </div>
  );
}
