import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";

export const createMateriaPrima = async () => {
  try {
    const { data } = await costsApi.post("/");
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
