"use client";

import {
  Home,
  Package,
  DollarSign,
  Settings,
  Users,
  TrendingUp,
  Calculator,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router";

const navigationItems = [
  {
    title: "Principal",
    items: [
      { title: "Dashboard", url: "/dashboard", icon: Home, badge: null },
      { title: "Productos", url: "/productos", icon: Package, badge: "12" },
      { title: "Costos", url: "/costs", icon: Calculator, badge: null },
      { title: "Unidades", url: "/units", icon: Calculator, badge: null },
      { title: "Materia", url: "/material", icon: Calculator, badge: null },
    ],
  },
  // {
  //   title: "Análisis",
  //   items: [
  //     { title: "Reportes", url: "/reportes", icon: FileText, badge: null },
  //     {
  //       title: "Estadísticas",
  //       url: "/estadisticas",
  //       icon: BarChart3,
  //       badge: "Nuevo",
  //     },
  //     {
  //       title: "Tendencias",
  //       url: "/tendencias",
  //       icon: TrendingUp,
  //       badge: null,
  //     },
  //   ],
  // },
  {
    title: "Administración",
    items: [
      { title: "Usuarios", url: "/users", icon: Users, badge: null },
      {
        title: "Configuración",
        url: "/configuracion",
        icon: Settings,
        badge: null,
      },
    ],
  },
];

export function AppSidebar({ ...props }) {
  return (
    <Sidebar
      {...props}
      className="border-r border-white/20 bg-white/80 backdrop-blur-md"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-white/20 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 text-white shadow-lg">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              CostManager
            </h2>
            <p className="text-xs text-gray-500">Sistema de Gestión</p>
          </div>
        </div>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent className="px-4 py-6">
        {navigationItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              {group.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="space-y-1">
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group relative overflow-hidden rounded-xl transition-all duration-200 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:shadow-md"
                    >
                      <Link
                        to={item.url}
                        className="flex items-center gap-3 px-3 py-2.5"
                      >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gray-100 group-hover:bg-white group-hover:shadow-sm transition-all duration-200">
                          <item.icon className="h-4 w-4 text-gray-600 group-hover:text-blue-600 transition-colors duration-200" />
                        </div>
                        <span className="font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
                          {item.title}
                        </span>
                        {item.badge && (
                          <Badge
                            variant="secondary"
                            className="ml-auto text-xs bg-blue-100 text-blue-700 group-hover:bg-blue-200"
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-white/20 p-4">
        <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-4 text-center">
          <div className="mb-2">
            <div className="mx-auto h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </div>
          <p className="text-xs font-medium text-gray-700">
            Rendimiento del Sistema
          </p>
          <p className="text-xs text-gray-500">Óptimo • 99.9% Uptime</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
