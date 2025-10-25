import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";

export const deleteCost = async (id: string) => {
  try {
    const { data } = await costsApi.delete(`/costs/delete-cost/${id}`);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
