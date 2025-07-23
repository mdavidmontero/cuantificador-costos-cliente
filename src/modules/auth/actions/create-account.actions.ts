import { isAxiosError } from "axios";
import { type RegisterFormData } from "../schemas";
import costsApi from "@/api/costApi";

export const createAccount = async (formData: RegisterFormData) => {
  try {
    const { data } = await costsApi.post(`/auth/create-account`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
};
