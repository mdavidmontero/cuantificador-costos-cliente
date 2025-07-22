import { z } from "zod";

export const productSchemaForm = z.object({
  id: z.number(),
  nombre: z.string(),
  organizacionId: z.string(),
});

export const productSchemaFormData = productSchemaForm.omit({
  id: true,
  organizacionId: true,
});
export type productSchemaFormData = z.infer<typeof productSchemaFormData>;

export type ProductoForm = z.infer<typeof productSchemaForm>;
export const ProductSchemaList = z.array(productSchemaForm);
