import { isAxiosError } from "axios";
import { type RegisterFormData } from "../schemas";
import costsApi from "@/api/costApi";
import type { AuthResponse } from "../types";

export const createAccount = async (
  formData: RegisterFormData
): Promise<AuthResponse> => {
  try {
    const { data } = await costsApi.post<AuthResponse>(
      `/auth/create-account`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
    throw new Error("Error desconocido al crear la cuenta");
  }
};
