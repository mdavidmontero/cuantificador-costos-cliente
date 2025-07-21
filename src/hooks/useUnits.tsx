import { getUnits } from "@/modules/units/actions/get-units.actions";
import { useQuery } from "@tanstack/react-query";

export default function useUnits() {
  const { data: unidadMedida } = useQuery({
    queryKey: ["getUnidadMedidas"],
    queryFn: getUnits,
  });

  return {
    unidadMedida,
  };
}
