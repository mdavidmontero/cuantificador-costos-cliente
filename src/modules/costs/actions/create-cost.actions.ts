import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import type { RegistroCostosFormValues } from "../schemas";

export const createCost = async (formData: RegistroCostosFormValues) => {
  try {
    const { data } = await costsApi.post("/costs/create-costs", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
