import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import { costEvolutionArraySchema } from "../schemas";

interface Params {
  from: Date;
  to: Date;
  mode: "dia" | "semana";
  productoId?: number;
  tipoConsulta?: "costos" | "precios";
}
export const getEvolutionCosts = async (params: Params) => {
  try {
    const { data } = await costsApi("/costs/get-evolution-costs", {
      params: {
        startDate: params.from,
        endDate: params.to,
        modo: params.mode,
        productoId: params.productoId,
        tipoConsulta: params.tipoConsulta || "costos",
      },
    });

    const response = costEvolutionArraySchema.safeParse(data);
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
