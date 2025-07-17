import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import { getUnitById } from "../actions/get-unit-by-id";
import SpinnerShared from "@/components/shared/spinner/SpinnerShared";
import EditUnitForm from "../components/EditUnitForm";

export default function EditUnitView() {
  const params = useParams();
  const unitId = +params.id!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editUnit", unitId],
    queryFn: () => getUnitById(unitId),
  });
  if (isLoading) return <SpinnerShared />;
  if (isError) return <Navigate to="/404" />;

  if (data) return <EditUnitForm data={data} unitId={unitId} />;
}
