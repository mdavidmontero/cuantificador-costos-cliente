import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import type { productSchemaFormData } from "../schemas";

export const createProduct = async (formData: productSchemaFormData) => {
  try {
    const { data } = await costsApi.post("/product/create-product", formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
