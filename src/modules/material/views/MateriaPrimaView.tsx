import { Link } from "react-router-dom";

export default function MateriaPrimaView() {
  return (
    <>
      <h1 className="text-5xl font-black">Mis Materias Primas</h1>
      <p className="text-2x font-light text-gray-500 mt-5 ">
        Maneja y administra tus Materias Primas
      </p>
      <nav className="my-5">
        <Link
          className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
          to={"/material/create"}
        >
          Nueva Materia Prima
        </Link>
      </nav>
      <h1>Listado de nateria prima aqui</h1>
    </>
  );
}
