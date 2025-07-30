import { Ruler } from "lucide-react";
import type { ListSchemaUser } from "../schemas";

interface Props {
  data: ListSchemaUser[];
}
export default function ListUser({ data }: Props) {
  return (
    <div className="space-y-6">
      {data.map((user) => (
        <div key={user.id} className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl shadow-lg">
            <Ruler className="h-8 w-8 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 via-purple-800 to-violet-800 bg-clip-text text-transparent">
              {user.name}
            </h2>
            <p className="text-gray-600 mt-3 text-sm">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
