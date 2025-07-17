import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getUnits } from "../actions/get-units.actions";
import SpinnerShared from "@/components/shared/spinner/SpinnerShared";
import ListUnits from "../components/ListUnits";
import ThemeForm from "@/components/shared/search/SearchShared";

export default function UnitsMeasurementView() {
  const { data, isLoading } = useQuery({
    queryKey: ["getUnitsMeasurements"],
    queryFn: getUnits,
  });
  console.log(data);
  if (isLoading) return <SpinnerShared />;
  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Unidades de Medida</h1>
        <p className="text-2x font-light text-gray-500 mt-5 ">
          Administra las unidades de medida
        </p>
        <nav className="my-5">
          <Link
            className="bg-cyan-600 hover:bg-cyan-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/units/create"}
          >
            Nueva Unidad de Medida
          </Link>
        </nav>
        {data ? (
          <ListUnits data={data} />
        ) : (
          <p className="text-center py-20">
            No hay Unidades de Medida registradas
          </p>
        )}
        <ThemeForm />
      </>
    );
}
