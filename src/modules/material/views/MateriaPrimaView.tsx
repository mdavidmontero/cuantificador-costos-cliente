import { Link } from "react-router-dom";
import ListMaterial from "../components/ListMaterial";
import { useQuery } from "@tanstack/react-query";
import { getMateriaPrimas } from "../actions/get-materials.actions";
import SpinnerShared from "@/components/shared/spinner/SpinnerShared";

export default function MateriaPrimaView() {
  const { data, isLoading } = useQuery({
    queryKey: ["materiasPrimas"],
    queryFn: getMateriaPrimas,
  });

  if (isLoading) return <SpinnerShared />;

  if (data)
    return (
      <>
        <h1 className="text-5xl font-black">Mis Materias Primas</h1>
        <p className="text-2x font-light text-gray-500 mt-5 ">
          Maneja y administra tus Materias Primas
        </p>
        <nav className="my-5">
          <Link
            className="bg-cyan-600 hover:bg-cyan-700 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
            to={"/material/create"}
          >
            Nueva Materia Prima
          </Link>
        </nav>
        {data ? (
          <ListMaterial data={data} />
        ) : (
          <p className="text-center py-20">
            No hay Materias primas registradas
          </p>
        )}
      </>
    );
}
