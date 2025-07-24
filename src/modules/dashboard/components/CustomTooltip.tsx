import type { PropsCustomTooltip } from "../types";

export const CustomTooltip = ({
  active,
  payload,
  label,
}: PropsCustomTooltip) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3 min-w-[200px]">
        <p className="font-semibold text-gray-800 mb-2">{label}</p>
        {payload.map((entry, index) => (
          <div key={index} className="flex flex-col gap-1 text-sm">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-gray-600">{entry.name}:</span>
              <span className="font-semibold text-gray-800">
                {typeof entry.value === "number"
                  ? `$${entry.value.toLocaleString("es-ES", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}`
                  : entry.value}
              </span>
            </div>

            {entry.payload?.margenUtilidadUnitario != null && (
              <div className="flex items-center gap-2 pl-5">
                <span className="text-gray-500">Margen utilidad:</span>
                <span className="font-semibold text-green-700">
                  {entry.payload.margenUtilidadUnitario.toLocaleString(
                    "es-ES",
                    {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }
                  )}
                  %
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
  return null;
};
