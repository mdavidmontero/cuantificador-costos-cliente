import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import type { MateriaPrimaForm } from "../schemas";

export const createMateriaPrima = async (formData: MateriaPrimaForm) => {
  try {
    const { data } = await costsApi.post("/material/create-material", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
