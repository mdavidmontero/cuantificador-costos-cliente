import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/modules/admin/layouts/AppLayout";
import MateriaPrimaView from "@/modules/material/views/MateriaPrimaView";
import CreateProductView from "@/modules/material/views/CreateProductView";
import EditProductView from "@/modules/material/views/EditProductView";
import NotFoundView from "@/modules/404/views/NotFoundView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route path="/material" element={<MateriaPrimaView />} />
          <Route path="/material/create" element={<CreateProductView />} />
          <Route path="/material/edit/:id" element={<EditProductView />} />
        </Route>
        <Route path="/*" element={<NotFoundView />} />
      </Routes>
    </BrowserRouter>
  );
}
