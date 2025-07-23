import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/modules/admin/layouts/AppLayout";
import MateriaPrimaView from "@/modules/material/views/MateriaPrimaView";
import CreateProductView from "@/modules/material/views/CreateProductView";
import EditProductView from "@/modules/material/views/EditProductView";
import NotFoundView from "@/modules/404/views/NotFoundView";
import UnitsMeasurementView from "@/modules/units/views/UnitsMeasurementView";
import CreateUnitView from "@/modules/units/views/CreateUnitView";
import EditUnitView from "@/modules/units/views/EditUnitView";
import CalculateCostsView from "@/modules/costs/views/CalculateCostsView";
import CreateCostsView from "@/modules/costs/views/CreateCostsView";
import ProductsView from "@/modules/products/views/ProductsView";
import CreateProductsView from "@/modules/products/views/CreateProductsView";
import EditProductsView from "@/modules/products/views/EditProductsView";
import CostDetailView from "@/modules/costs/views/CostDetailView";
import AuthLayout from "@/modules/auth/layout/AuthLayout";
import LoginView from "@/modules/auth/views/LoginView";
import RegisterView from "@/modules/auth/views/RegisterView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
        </Route>
        <Route path="/" element={<AppLayout />}>
          <Route path="/productos" element={<ProductsView />} />
          <Route path="/product/create" element={<CreateProductsView />} />
          <Route path="/product/edit/:id" element={<EditProductsView />} />
          <Route path="/material" element={<MateriaPrimaView />} />
          <Route path="/material/create" element={<CreateProductView />} />
          <Route path="/material/edit/:id" element={<EditProductView />} />
          <Route path="/units" element={<UnitsMeasurementView />} />
          <Route path="/units/create" element={<CreateUnitView />} />
          <Route path="/units/edit/:id" element={<EditUnitView />} />
          <Route path="/costs" element={<CalculateCostsView />} />
          <Route path="/costs/create" element={<CreateCostsView />} />
          <Route path="/costs/:id" element={<CostDetailView />} />
        </Route>
        <Route path="/*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}
