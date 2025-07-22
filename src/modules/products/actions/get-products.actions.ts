import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import { ProductSchemaList } from "../schemas";

export const getProducts = async () => {
  try {
    const { data } = await costsApi.get("/product/get-products");
    const response = ProductSchemaList.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
