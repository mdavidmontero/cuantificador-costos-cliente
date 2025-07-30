import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import type { UserSchemaFormData } from "../schemas";

export const createUserOrganization = async (formData: UserSchemaFormData) => {
  try {
    const { data } = await costsApi.post(
      `/auth/create-user-organization`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
