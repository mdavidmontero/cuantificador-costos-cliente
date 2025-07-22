import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import type { EditMaterialForm } from "../schemas";

type MaterialType = {
  formData: EditMaterialForm;
  materialId: EditMaterialForm["id"];
};
export const updateMateriaPrima = async ({
  formData,
  materialId,
}: MaterialType) => {
  try {
    const { data } = await costsApi.patch(
      `/material/update-materia/${materialId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
