import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getMateriaPrimaById } from "../actions/get-material-by-id";
import EditMaterialForm from "../components/EditMaterialForm";
import SpinnerShared from "@/components/shared/spinner/SpinnerShared";
import NotFoundView from "@/modules/404/views/NotFoundView";

export default function EditProductView() {
  const params = useParams();
  const materialId = +params.id!;

  const { data, isLoading, isError } = useQuery({
    queryKey: ["editMaterial", materialId],
    queryFn: () => getMateriaPrimaById(materialId),
  });

  if (isLoading) return <SpinnerShared />;
  if (isError) return <NotFoundView />;

  if (data) return <EditMaterialForm data={data} materialId={materialId} />;
}
