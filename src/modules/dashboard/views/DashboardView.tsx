import { useQuery } from "@tanstack/react-query";
import { useState, useMemo } from "react";
import { addDays, format } from "date-fns";
import { es } from "date-fns/locale";
import {
  CalendarRangeIcon,
  TrendingUp,
  DollarSign,
  BarChart3,
  Activity,
  Target,
  Settings,
  Filter,
  Package,
  Search,
  X,
} from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CalendarFilter from "../components/CalendarFilter";
import { getEvolutionCosts } from "../actions/get-cost-evolution.actions";
import { CHART_COLORS } from "../types";
import { CustomTooltip } from "../components/CustomTooltip";
import { StatCard } from "../components/StatCard";
import { getProducts } from "@/modules/products/actions/get-products.actions";

interface Product {
  id: number;
  nombre: string;
  organizacionId: string;
}

export default function DashboardView() {
  const [modo, setModo] = useState<"dia" | "semana">("dia");
  const [dateSelected, setDateSelected] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: addDays(new Date(), -5),
    to: addDays(new Date(), 5),
  });
  const [productoId, setProductoId] = useState<number | undefined>(undefined);

  const { data, isLoading } = useQuery({
    queryKey: [
      "cost-evolution",
      modo,
      dateSelected.from,
      dateSelected.to,
      productoId,
    ],
    queryFn: () =>
      getEvolutionCosts({
        from: dateSelected.from!,
        to: dateSelected.to!,
        mode: modo,
        productoId: productoId,
      }),
    enabled: !!dateSelected.from && !!dateSelected.to && !!modo,
  });

  const { data: productos, isLoading: isLoadingProducts } = useQuery({
    queryKey: ["productos"],
    queryFn: getProducts,
  });

  const transformedData = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    return data.map((item) => ({
      label: format(
        new Date(item.fecha),
        modo === "dia" ? "dd MMM" : "'Sem' w",
        { locale: es }
      ),
      fecha: item.fecha,
      total: item.costoUnitario,
      costoUnitario: item.costoUnitario,
      margenUtilidadUnitario: item.margenUtilidadUnitario,
    }));
  }, [data, modo]);

  const statistics = useMemo(() => {
    if (!transformedData || transformedData.length === 0) {
      return {
        totalCost: 0,
        averageCost: 0,
        maxCost: 0,
        minCost: 0,
        trend: 0,
        efficiency: 0,
      };
    }

    const costs = transformedData.map((item) => item.costoUnitario);
    const totalCost = costs.reduce((sum, cost) => sum + cost, 0);
    const averageCost = totalCost / costs.length;
    const maxCost = Math.max(...costs);
    const minCost = Math.min(...costs);

    const midPoint = Math.floor(costs.length / 2);
    const firstHalf = costs.slice(0, midPoint);
    const secondHalf = costs.slice(midPoint);

    const firstHalfAvg =
      firstHalf.reduce((sum, cost) => sum + cost, 0) / firstHalf.length;
    const secondHalfAvg =
      secondHalf.reduce((sum, cost) => sum + cost, 0) / secondHalf.length;

    const trend =
      firstHalfAvg > 0
        ? ((secondHalfAvg - firstHalfAvg) / firstHalfAvg) * 100
        : 0;

    const variance =
      costs.reduce((sum, cost) => sum + Math.pow(cost - averageCost, 2), 0) /
      costs.length;
    const standardDeviation = Math.sqrt(variance);
    const coefficientOfVariation =
      averageCost > 0 ? (standardDeviation / averageCost) * 100 : 0;
    const efficiency = Math.max(0, 100 - coefficientOfVariation);

    return {
      totalCost,
      averageCost,
      maxCost,
      minCost,
      trend,
      efficiency,
    };
  }, [transformedData]);

  // Get selected product name
  const selectedProductName = useMemo(() => {
    if (!productoId || !productos) return "Todos los productos";
    const product = productos.find((p: Product) => p.id === productoId);
    return product ? product.nombre : "Todos los productos";
  }, [productoId, productos]);

  // Product Selector Component
  const ProductSelector = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-green-600" />
        <h4 className="font-semibold text-gray-800">Filtrar por Producto</h4>
      </div>
      <div className="flex gap-2">
        <Select
          value={productoId?.toString() || "all"}
          onValueChange={(value) =>
            setProductoId(value === "all" ? undefined : Number.parseInt(value))
          }
        >
          <SelectTrigger
            className={`${
              isMobile ? "flex-1" : "min-w-[250px]"
            } bg-white/80 backdrop-blur-sm border-white/60`}
          >
            <SelectValue placeholder="Selecciona un producto">
              <div className="flex items-center gap-2">
                <Package className="h-4 w-4 text-green-600" />
                <span className="truncate">{selectedProductName}</span>
              </div>
            </SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white/95 backdrop-blur-sm border-white/60">
            <SelectItem value="all" className="hover:bg-blue-50">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-blue-600" />
                <span>Todos los productos</span>
              </div>
            </SelectItem>
            {isLoadingProducts ? (
              <SelectItem value="loading" disabled>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
                  <span>Cargando productos...</span>
                </div>
              </SelectItem>
            ) : (
              productos?.map((producto: Product) => (
                <SelectItem
                  key={producto.id}
                  value={producto.id.toString()}
                  className="hover:bg-green-50"
                >
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-green-600" />
                    <span className="truncate">{producto.nombre}</span>
                  </div>
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        {productoId && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setProductoId(undefined)}
            className="hover:bg-red-50 hover:text-red-700 hover:border-red-300 transition-colors"
            title="Limpiar filtro de producto"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );

  // Mobile Controls Component
  const MobileControls = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="lg:hidden bg-white/80 backdrop-blur-sm border-white/60 hover:bg-white/90 transition-all duration-200 shadow-sm"
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
          {productoId && (
            <Badge
              variant="secondary"
              className="ml-2 bg-green-100 text-green-800 text-xs"
            >
              1
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-auto max-h-[80vh]">
        <SheetHeader className="text-left">
          <SheetTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Configuración del Dashboard
          </SheetTitle>
          <SheetDescription>
            Ajusta los filtros y configuraciones para personalizar tu vista
          </SheetDescription>
        </SheetHeader>

        <div className="space-y-6 mt-6">
          {/* Product Filter */}
          <ProductSelector isMobile={true} />

          <Separator />

          {/* Calendar Filter */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <CalendarRangeIcon className="h-4 w-4 text-blue-600" />
              <h4 className="font-semibold text-gray-800">Rango de Fechas</h4>
            </div>
            <CalendarFilter setDateSelected={setDateSelected} showCard={true} />
          </div>

          <Separator />

          {/* Mode Toggle */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800 flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-purple-600" />
              Modo de Visualización
            </h4>
            <ToggleGroup
              type="single"
              value={modo}
              onValueChange={(value) => {
                if (value) setModo(value as "dia" | "semana");
              }}
              className="w-full bg-white/80 backdrop-blur-sm border border-white/60 rounded-lg p-1"
            >
              <ToggleGroupItem
                value="dia"
                className="flex-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-500 data-[state=on]:to-purple-600 data-[state=on]:text-white"
              >
                Modo Día
              </ToggleGroupItem>
              <ToggleGroupItem
                value="semana"
                className="flex-1 data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-500 data-[state=on]:to-purple-600 data-[state=on]:text-white"
              >
                Modo Semana
              </ToggleGroupItem>
            </ToggleGroup>
          </div>

          {/* Stats Summary */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">Resumen Rápido</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-xs text-blue-600 font-medium">Registros</p>
                <p className="text-lg font-bold text-blue-800">
                  {transformedData.length}
                </p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <p className="text-xs text-green-600 font-medium">Eficiencia</p>
                <p className="text-lg font-bold text-green-800">
                  {statistics.efficiency.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="space-y-6 md:space-y-8">
      {/* Header Section - Responsive */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5 rounded-2xl -z-10" />

        <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
          <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500" />

          <div className="p-4 md:p-6 lg:p-8">
            {/* Mobile Header */}
            <div className="block lg:hidden space-y-4">
              {/* Title Section */}
              <div className="flex items-start gap-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg shadow-lg flex-shrink-0">
                  <BarChart3 className="h-6 w-6 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent leading-tight">
                    Dashboard de Costos
                  </h1>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 text-xs"
                    >
                      Análisis en Tiempo Real
                    </Badge>
                    {transformedData.length > 0 && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800 text-xs"
                      >
                        {transformedData.length} registros
                      </Badge>
                    )}
                    {productoId && (
                      <Badge
                        variant="secondary"
                        className="bg-purple-100 text-purple-800 text-xs"
                      >
                        <Package className="h-3 w-3 mr-1" />
                        Producto específico
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Monitorea la evolución de tus costos unitarios{" "}
                {productoId
                  ? `para ${selectedProductName}`
                  : "de todos los productos"}{" "}
                con visualizaciones profesionales.
              </p>

              {/* Mobile Controls */}
              <div className="flex items-center justify-between">
                <MobileControls />
                <div className="text-xs text-gray-500">
                  {dateSelected.from && dateSelected.to && (
                    <span>
                      {format(dateSelected.from, "dd MMM", { locale: es })} -{" "}
                      {format(dateSelected.to, "dd MMM", { locale: es })}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block">
              <div className="flex flex-col xl:flex-row xl:items-start xl:justify-between gap-6">
                {/* Left Section */}
                <div className="space-y-4 flex-1">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                      <BarChart3 className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl xl:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
                        Dashboard de Costos
                      </h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800"
                        >
                          Análisis en Tiempo Real
                        </Badge>
                        {transformedData.length > 0 && (
                          <Badge
                            variant="secondary"
                            className="bg-green-100 text-green-800"
                          >
                            {transformedData.length} registros
                          </Badge>
                        )}
                        {productoId && (
                          <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-800"
                          >
                            <Package className="h-3 w-3 mr-1" />
                            {selectedProductName}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 max-w-3xl leading-relaxed">
                    Monitorea la evolución de tus costos unitarios de producción{" "}
                    {productoId
                      ? `para ${selectedProductName}`
                      : "de todos los productos"}{" "}
                    con visualizaciones profesionales y métricas clave para la
                    toma de decisiones estratégicas.
                  </p>
                </div>

                {/* Right Section - Desktop Controls */}
                <div className="flex flex-col gap-4 xl:items-end min-w-0">
                  {/* Product Filter */}
                  <ProductSelector />

                  {/* Calendar Filter */}
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <CalendarRangeIcon className="h-4 w-4" />
                      <span className="hidden xl:inline">Período:</span>
                    </div>
                    <CalendarFilter setDateSelected={setDateSelected} />
                  </div>

                  {/* Mode Toggle */}
                  <ToggleGroup
                    type="single"
                    value={modo}
                    onValueChange={(value) => {
                      if (value) setModo(value as "dia" | "semana");
                    }}
                    className="bg-white/80 backdrop-blur-sm border border-white/60 rounded-lg p-1"
                  >
                    <ToggleGroupItem
                      value="dia"
                      className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-500 data-[state=on]:to-purple-600 data-[state=on]:text-white"
                    >
                      Modo Día
                    </ToggleGroupItem>
                    <ToggleGroupItem
                      value="semana"
                      className="data-[state=on]:bg-gradient-to-r data-[state=on]:from-blue-500 data-[state=on]:to-purple-600 data-[state=on]:text-white"
                    >
                      Modo Semana
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Active Filters Display */}
      {productoId && (
        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 shadow-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Search className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-green-800">
                    Filtro Activo
                  </h4>
                  <p className="text-sm text-green-700">
                    Mostrando datos para:{" "}
                    <span className="font-medium">{selectedProductName}</span>
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setProductoId(undefined)}
                className="hover:bg-green-100 hover:text-green-700 transition-colors"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards - Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatCard
          title="Costo Promedio"
          value={`$${statistics.averageCost.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          change={`${Math.abs(statistics.trend).toFixed(1)}%`}
          icon={DollarSign}
          trend={statistics.trend >= 0 ? "up" : "down"}
          color="blue"
        />
        <StatCard
          title="Eficiencia"
          value={`${statistics.efficiency.toFixed(1)}%`}
          change={`${(statistics.efficiency - 85).toFixed(1)}%`}
          icon={Target}
          trend={statistics.efficiency >= 85 ? "up" : "down"}
          color="green"
        />
        <StatCard
          title="Costo Máximo"
          value={`$${statistics.maxCost.toLocaleString("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}`}
          change={`${(
            ((statistics.maxCost - statistics.averageCost) /
              statistics.averageCost) *
            100
          ).toFixed(1)}%`}
          icon={Activity}
          trend="up"
          color="purple"
        />
        <StatCard
          title="Tendencia"
          value={statistics.trend >= 0 ? "Creciente" : "Decreciente"}
          change={`${Math.abs(statistics.trend).toFixed(1)}%`}
          icon={TrendingUp}
          trend={statistics.trend >= 0 ? "up" : "down"}
          color="orange"
        />
      </div>

      {/* Main Chart - Responsive */}
      <Card className="shadow-lg border-0 overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b border-gray-100 p-4 md:p-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg md:text-xl text-gray-800">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              <span>
                Evolución de Costos Unitarios
                {productoId && ` - ${selectedProductName}`}
              </span>
            </div>
            <div className="flex items-center gap-2 sm:ml-auto">
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-800 text-xs"
              >
                {modo === "dia" ? "Diaria" : "Semanal"}
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-800 text-xs"
              >
                {transformedData.length} puntos
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          {isLoading ? (
            <div className="space-y-4">
              <Skeleton className="w-full h-8" />
              <Skeleton className="w-full h-64 md:h-80" />
            </div>
          ) : transformedData && transformedData.length > 0 ? (
            <ResponsiveContainer
              width="100%"
              height={window.innerWidth < 768 ? 300 : 400}
            >
              <AreaChart
                data={transformedData}
                margin={{
                  top: 20,
                  right: window.innerWidth < 768 ? 10 : 30,
                  left: window.innerWidth < 768 ? 10 : 20,
                  bottom: window.innerWidth < 768 ? 40 : 20,
                }}
              >
                <defs>
                  <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={CHART_COLORS.primary}
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="label"
                  tick={{
                    fontSize: window.innerWidth < 768 ? 10 : 12,
                    fill: "#6B7280",
                  }}
                  axisLine={{ stroke: "#E5E7EB" }}
                  angle={window.innerWidth < 768 ? -45 : -30}
                  textAnchor="end"
                  height={window.innerWidth < 768 ? 50 : 60}
                />
                <YAxis
                  tickFormatter={(value) => `$${(value / 1000).toFixed(1)}K`}
                  tick={{
                    fontSize: window.innerWidth < 768 ? 10 : 12,
                    fill: "#6B7280",
                  }}
                  axisLine={{ stroke: "#E5E7EB" }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="costoUnitario"
                  name="Costo Unitario"
                  stroke={CHART_COLORS.primary}
                  strokeWidth={3}
                  fill="url(#costGradient)"
                  dot={{
                    fill: CHART_COLORS.primary,
                    strokeWidth: 2,
                    r: window.innerWidth < 768 ? 3 : 4,
                  }}
                  activeDot={{
                    r: window.innerWidth < 768 ? 5 : 6,
                    stroke: CHART_COLORS.primary,
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 md:h-80 text-center px-4">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <BarChart3 className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">
                No hay datos disponibles
              </h3>
              <p className="text-sm md:text-base text-gray-500 max-w-md">
                {productoId
                  ? `No se encontraron datos para ${selectedProductName} en el rango de fechas seleccionado.`
                  : "Selecciona un rango de fechas diferente para ver los datos de evolución."}
              </p>
              {productoId && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setProductoId(undefined)}
                  className="mt-4 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                >
                  Ver todos los productos
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
