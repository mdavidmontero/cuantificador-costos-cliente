import { z } from "zod";
export const materiaPrimaSchema = z.object({
  name: z.string(),
});

export type MateriaPrimaForm = z.infer<typeof materiaPrimaSchema>;

export const schemaMaterial = z.object({
  id: z.number(),
  nombre: z.string(),
  organizacionId: z.string(),
});

export const schemaMaterialList = z.array(schemaMaterial);

export type SchemaMaterialList = z.infer<typeof schemaMaterial>;
export type EditMaterialForm = z.infer<typeof schemaMaterial>;
