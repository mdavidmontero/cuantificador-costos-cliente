import { isAxiosError } from "axios";
import type { LoginFormData } from "../schemas";
import costsApi from "@/api/costApi";

export const login = async (formData: LoginFormData) => {
  try {
    const { data } = await costsApi.post(`/auth/login`, formData);
    localStorage.setItem("AUTH_TOKEN", data);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      console.log(error);
      throw new Error(error.response.data.error);
    }
  }
};
