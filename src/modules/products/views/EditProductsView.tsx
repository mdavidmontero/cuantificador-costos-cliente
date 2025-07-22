import { useQuery } from "@tanstack/react-query";
import { Navigate, useParams } from "react-router-dom";
import SpinnerShared from "@/components/shared/spinner/SpinnerShared";
import { getProductById } from "../actions/get-product-by-id";
import EditProductsForm from "../components/EditProductsForm";

export default function EditProductsView() {
  const params = useParams();
  const productId = +params.id!;
  const { data, isLoading, isError } = useQuery({
    queryKey: ["editUnit", productId],
    queryFn: () => getProductById(productId),
  });
  if (isLoading) return <SpinnerShared />;
  if (isError) return <Navigate to="/404" />;

  if (data) return <EditProductsForm data={data} productId={productId} />;
}
