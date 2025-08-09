import costsApi from "@/api/costApi";
import type { AuthResponse } from "../types";

export const checkAuthAction = async (): Promise<AuthResponse> => {
  const token = localStorage.getItem("AUTH_TOKEN");
  if (!token) throw new Error("No hay token");
  try {
    const { data } = await costsApi.get<AuthResponse>("/auth/check-auth");
    localStorage.setItem("AUTH_TOKEN", data.token);
    return data;
  } catch (error) {
    console.log(error);
    localStorage.removeItem("AUTH_TOKEN");
    throw new Error("Token expired or not valid");
  }
};
