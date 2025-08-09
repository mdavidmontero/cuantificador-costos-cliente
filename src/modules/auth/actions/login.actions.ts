import { isAxiosError } from "axios";
import type { LoginFormData } from "../schemas";
import costsApi from "@/api/costApi";
import type { AuthResponse } from "../types";

export const loginAction = async (
  formData: LoginFormData
): Promise<AuthResponse> => {
  try {
    const { data } = await costsApi.post<AuthResponse>(`/auth/login`, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error al intentar iniciar sesión");
  }
};
