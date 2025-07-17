import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import type { MeasurementForm } from "../schemas";
interface updateUnitFormData {
  unitId: MeasurementForm["id"];
  formData: MeasurementForm;
}
export const updateUnit = async ({ unitId, formData }: updateUnitFormData) => {
  try {
    const { data } = await costsApi.patch(
      `/units/update-unit/${unitId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
