import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router";
import { getMateriaPrimaById } from "../actions/get-material-by-id";
import EditMaterialForm from "../components/EditMaterialForm";
import SpinnerShared from "@/components/shared/spinner/SpinnerShared";

export default function EditProductView() {
  const params = useParams();
  const materialId = +params.id!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editMaterial", materialId],
    queryFn: () => getMateriaPrimaById(materialId),
  });

  if (isLoading) return <SpinnerShared />;
  if (isError) return <Navigate to="/404" />;

  if (data) return <EditMaterialForm data={data} materialId={materialId} />;
}
