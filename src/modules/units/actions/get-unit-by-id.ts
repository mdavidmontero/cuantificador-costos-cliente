import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import { unitSchemaForm } from "../schemas";

export const getUnitById = async (id: number) => {
  try {
    const { data } = await costsApi(`/units/get-unit-by-id/${id}`);
    const response = unitSchemaForm.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
