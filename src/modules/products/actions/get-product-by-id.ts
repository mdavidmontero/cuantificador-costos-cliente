import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import { productSchemaForm } from "../schemas";

export const getProductById = async (id: number) => {
  try {
    const { data } = await costsApi(`/product/get-product-by-id/${id}`);
    const response = productSchemaForm.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
