import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import { UnitSchemaList } from "../schemas";

export const getUnits = async () => {
  try {
    const { data } = await costsApi.get("/units/get-units");
    const response = UnitSchemaList.safeParse(data);
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
