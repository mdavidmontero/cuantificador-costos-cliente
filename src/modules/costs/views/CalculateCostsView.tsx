import { Link } from "react-router-dom";

export default function CalculateCostsView() {
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
    </>
  );
}
