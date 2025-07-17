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

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/material" element={<MateriaPrimaView />} />
          <Route path="/material/create" element={<CreateProductView />} />
          <Route path="/material/edit/:id" element={<EditProductView />} />
          <Route path="/units" element={<UnitsMeasurementView />} />
          <Route path="/units/create" element={<CreateUnitView />} />
          <Route path="/units/edit/:id" element={<EditUnitView />} />
          <Route path="/costs" element={<CalculateCostsView />} />
          <Route path="/costs/create" element={<CreateCostsView />} />
        </Route>
        <Route path="/*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}
