import { useNavigate } from "react-router-dom";
import type { MeasurementForm } from "../schemas";
import { PencilIcon, TrashIcon } from "lucide-react";

interface ListunitsProps {
  data: MeasurementForm[];
}

export default function ListUnits({ data }: ListunitsProps) {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-x-auto rounded border border-gray-200 dark:border-gray-700 shadow-sm">
      <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300">
        <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
          <tr className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300">
            <th className="px-4 py-3 whitespace-nowrap">ID</th>
            <th className="px-4 py-3 whitespace-nowrap">Nombre</th>
            <th className="px-4 py-3 whitespace-nowrap text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800 bg-white dark:bg-gray-900">
          {data.map((units) => (
            <tr
              key={units.id}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td className="px-4 py-3 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                {units.id}
              </td>
              <td className="px-4 py-3 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                {units.name}
              </td>
              <td className="px-4 py-3 text-center">
                <div className="inline-flex items-center justify-center gap-2">
                  <button
                    onClick={() => navigate(`/units/edit/${units.id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition"
                  >
                    <PencilIcon className="w-4 h-4" />
                    Editar
                  </button>
                  <button
                    onClick={() => {}}
                    className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
