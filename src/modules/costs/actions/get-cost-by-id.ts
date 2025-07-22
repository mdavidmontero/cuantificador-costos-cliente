import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import { SchemaCostZod, schemaListCostsZod } from "../schemas";

export const getCostById = async (id: string) => {
  try {
    const { data } = await costsApi(`/costs/get-cost-by-id/${id}`);
    const response = SchemaCostZod.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};

export const getCostsAll = async () => {
  try {
    const { data } = await costsApi.get("/costs/get-all-costs");
    const response = schemaListCostsZod.safeParse(data);
    console.log(response);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
