import SpinnerShared from "@/components/shared/spinner/SpinnerShared";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getProducts } from "../actions/get-products.actions";
import ListProducts from "../components/ListProducts";

export default function ProductsView() {
  const { data, isLoading } = useQuery({
    queryKey: ["getProducts"],
    queryFn: getProducts,
  });
  if (isLoading) return <SpinnerShared />;
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Productos</h1>
        <p className="text-2x font-light text-gray-500 mt-5 ">
          Administra tus productos
        </p>
        <nav className="my-5">
          <Link
            className="bg-cyan-600 hover:bg-cyan-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/product/create"}
          >
            Nuevo Producto
          </Link>
        </nav>
        {data.length ? (
          <ListProducts data={data} />
        ) : (
          <p className="text-center py-20">No hay productos registrados</p>
        )}
      </>
    );
}
