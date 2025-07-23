"use client";

import SpinnerShared from "@/components/shared/spinner/SpinnerShared";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getProducts } from "../actions/get-products.actions";
import ListProducts from "../components/ListProducts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function ProductsView() {
  const { data, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });

  if (isLoading) return <SpinnerShared />;

  if (data)
    return (
      <div className="space-y-8">
        {/* Header Section */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/5 via-emerald-600/5 to-teal-600/5 rounded-2xl -z-10" />

          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-lg overflow-hidden">
            <div className="h-1 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500" />

            <div className="p-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                {/* Left side - Title and description */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg">
                      <Package className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-green-800 to-emerald-800 bg-clip-text text-transparent">
                        Gestión de Productos
                      </h1>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800"
                        >
                          Catálogo Principal
                        </Badge>
                        {data?.length && (
                          <Badge
                            variant="secondary"
                            className="bg-emerald-100 text-emerald-800"
                          >
                            {data.length}{" "}
                            {data.length === 1 ? "producto" : "productos"}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                    Administra tu catálogo completo de productos
                  </p>
                </div>

                <div className="flex flex-col items-center lg:items-end gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-6 text-lg font-semibold"
                  >
                    <Link
                      to="/product/create"
                      className="flex items-center gap-3"
                    >
                      <Plus className="h-6 w-6" />
                      Nuevo Producto
                    </Link>
                  </Button>

                  <p className="text-sm text-gray-500 text-center lg:text-right">
                    Agrega productos a tu catálogo
                    <br />
                    para expandir tu oferta
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="space-y-6">
          {data.length ? (
            <ListProducts data={data} />
          ) : (
            <Card className="shadow-lg border-0">
              <CardContent className="p-12 text-center">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-6">
                  <Package className="h-12 w-12 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  ¡Crea tu primer producto!
                </h3>
                <p className="text-gray-600 mb-6 max-w-md mx-auto">
                  No tienes productos registrados. Comienza agregando productos
                  a tu catálogo para gestionar tu inventario y ventas.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Link
                    to="/product/create"
                    className="flex items-center gap-2"
                  >
                    <Plus className="h-5 w-5" />
                    Crear Primer Producto
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
}
