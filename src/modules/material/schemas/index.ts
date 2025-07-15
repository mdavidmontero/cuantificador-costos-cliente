import { z } from "zod";
export const materiaPrimaSchema = z.object({
  name: z.string(),
});

export type MateriaPrima = z.infer<typeof materiaPrimaSchema>;
