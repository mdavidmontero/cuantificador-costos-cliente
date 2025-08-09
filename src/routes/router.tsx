import { createBrowserRouter, Navigate } from "react-router-dom";

import {
  NotAuthenticatedRoute,
  AdminRoute,
} from "@/components/routes/ProtectedRoutes";

import DashboardView from "@/modules/dashboard/views/DashboardView";
import UsersView from "@/modules/users/views/UsersView";
import CreateUserView from "@/modules/users/views/CreateUserView";

import ProductsView from "@/modules/products/views/ProductsView";
import CreateProductsView from "@/modules/products/views/CreateProductsView";
import EditProductsView from "@/modules/products/views/EditProductsView";

import MateriaPrimaView from "@/modules/material/views/MateriaPrimaView";
import CreateProductView from "@/modules/material/views/CreateProductView";
import EditProductView from "@/modules/material/views/EditProductView";

import UnitsMeasurementView from "@/modules/units/views/UnitsMeasurementView";
import CreateUnitView from "@/modules/units/views/CreateUnitView";
import EditUnitView from "@/modules/units/views/EditUnitView";

import CalculateCostsView from "@/modules/costs/views/CalculateCostsView";
import CreateCostsView from "@/modules/costs/views/CreateCostsView";
import CostDetailView from "@/modules/costs/views/CostDetailView";

import LoginView from "@/modules/auth/views/LoginView";
import RegisterView from "@/modules/auth/views/RegisterView";

import NotFoundView from "@/modules/404/views/NotFoundView";
import { lazy } from "react";

const AuthLayout = lazy(() => import("../modules/auth/layout/AuthLayout.tsx"));
const AdminLayout = lazy(
  () => import("../modules/admin/layouts/AppLayout.tsx")
);
export const appRouter = createBrowserRouter([
  {
    path: "/auth",
    element: (
      <NotAuthenticatedRoute>
        <AuthLayout />
      </NotAuthenticatedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/auth/login" />,
      },
      {
        path: "login",
        element: <LoginView />,
      },
      {
        path: "register",
        element: <RegisterView />,
      },
    ],
  },

  {
    path: "/",
    element: (
      <AdminRoute>
        <AdminLayout />
      </AdminRoute>
    ),
    children: [
      {
        path: "dashboard",
        element: <DashboardView />,
      },
      {
        path: "users",
        element: <UsersView />,
      },
      {
        path: "users/create",
        element: <CreateUserView />,
      },
      {
        path: "productos",
        element: <ProductsView />,
      },
      {
        path: "product/create",
        element: <CreateProductsView />,
      },
      {
        path: "product/edit/:id",
        element: <EditProductsView />,
      },
      {
        path: "material",
        element: <MateriaPrimaView />,
      },
      {
        path: "material/create",
        element: <CreateProductView />,
      },
      {
        path: "material/edit/:id",
        element: <EditProductView />,
      },
      {
        path: "units",
        element: <UnitsMeasurementView />,
      },
      {
        path: "units/create",
        element: <CreateUnitView />,
      },
      {
        path: "units/edit/:id",
        element: <EditUnitView />,
      },
      {
        path: "costs",
        element: <CalculateCostsView />,
      },
      {
        path: "costs/create",
        element: <CreateCostsView />,
      },
      {
        path: "costs/:id",
        element: <CostDetailView />,
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundView />,
  },
]);
