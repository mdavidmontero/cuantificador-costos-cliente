import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getCostsAll } from "../actions/get-cost-by-id";
import ListCost from "../components/LisCost";

export default function CalculateCostsView() {
  const { data } = useQuery({
    queryKey: ["getCostsAll"],
    queryFn: getCostsAll,
  });
  console.log(data);
  return (
    <>
      <h1 className="text-5xl font-black">Calcular Costos</h1>
      <p className="text-2x font-light text-gray-500 mt-5 ">
        Cuantifica tus costos de producción por Producto
      </p>
      <nav className="my-5">
        <Link
          className="bg-cyan-600 hover:bg-cyan-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to={"/costs/create"}
        >
          Calcular Costo
        </Link>
      </nav>
      {data?.length ? (
        <ListCost data={data || []} />
      ) : (
        <p className="text-center py-20">No hay Costos registrados</p>
      )}
    </>
  );
}
