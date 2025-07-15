import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/modules/admin/layouts/AppLayout";
import MateriaPrimaView from "@/modules/material/views/MateriaPrimaView";
import CreateProductView from "@/modules/material/views/CreateProductView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/dashboard" element={<MateriaPrimaView />} />
          <Route path="/material/create" element={<CreateProductView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
