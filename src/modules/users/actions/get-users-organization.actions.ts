import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import { ListSchemaUserSchema } from "../schemas";

export const getUsersOrganization = async () => {
  try {
    const { data } = await costsApi.get(`/auth/get-users-all-organization`);
    const response = ListSchemaUserSchema.safeParse(data);
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
