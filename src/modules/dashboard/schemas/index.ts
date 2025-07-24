import { z } from "zod";
export const costEvolutionSchema = z.object({
  costoUnitario: z.number(),
  fecha: z.string(),
  margenUtilidadUnitario: z.number(),
});

export type CostEvolution = z.infer<typeof costEvolutionSchema>;
export const costEvolutionArraySchema = z.array(costEvolutionSchema);
