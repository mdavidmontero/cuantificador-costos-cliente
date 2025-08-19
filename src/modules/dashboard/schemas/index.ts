import { z } from "zod";
export const costEvolutionSchema = z.object({
  costoUnitario: z.number().optional(),
  fecha: z.string(),
  margenUtilidadUnitario: z.number().optional(),
  precioVenta: z.number().optional(),
  margenUtilidad: z.number().optional(),
});

export type CostEvolution = z.infer<typeof costEvolutionSchema>;
export const costEvolutionArraySchema = z.array(costEvolutionSchema);
