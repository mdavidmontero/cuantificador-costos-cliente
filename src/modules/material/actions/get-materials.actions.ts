import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import { schemaMaterialList } from "../schemas";

export const getMateriaPrimas = async () => {
  try {
    const { data } = await costsApi.get("/material/get-materias");
    const response = schemaMaterialList.safeParse(data);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
