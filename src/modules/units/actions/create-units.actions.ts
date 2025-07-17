import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import type { unitSchemaFormData } from "../schemas";

export const createUnit = async (formData: unitSchemaFormData) => {
  try {
    const { data } = await costsApi.post("/units/create-unit", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
