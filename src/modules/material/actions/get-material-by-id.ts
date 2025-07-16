import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import { schemaMaterial, type SchemaMaterialList } from "../schemas";

export const getMateriaPrimaById = async (id: SchemaMaterialList["id"]) => {
  try {
    const { data } = await costsApi.get(`/material/get-materia-by-id/${id}`);
    const response = schemaMaterial.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
