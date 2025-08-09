import { Outlet } from "react-router-dom";
import { Calculator, TrendingUp, BarChart3, Shield } from "lucide-react";
// import { useAuth } from "../hooks/useAuth";

export default function AuthLayout() {
  // const { data, isLoading } = useAuth();
  // if (isLoading) return "Cargando...";
  // if (data) {
  //   return <Navigate to="/" replace />;
  // }
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden justify-center">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
              <Calculator className="h-8 w-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">CostManager</h1>
              <p className="text-blue-100">Sistema de Gestión de Costos</p>
            </div>
          </div>

          {/* Features */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold mb-6">
              Optimiza tu gestión empresarial
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Análisis de Costos</h3>
                  <p className="text-blue-100 text-sm">
                    Calcula y analiza costos de producción con precisión
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Reportes Detallados</h3>
                  <p className="text-blue-100 text-sm">
                    Genera reportes profesionales para toma de decisiones
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Datos Seguros</h3>
                  <p className="text-blue-100 text-sm">
                    Tu información empresarial protegida y respaldada
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
