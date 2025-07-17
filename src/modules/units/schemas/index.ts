import { z } from "zod";

export const unitSchemaForm = z.object({
  id: z.number(),
  name: z.string(),
  organizationId: z.string(),
});

export const unitSchemaFormData = unitSchemaForm.omit({
  id: true,
  organizationId: true,
});
export type unitSchemaFormData = z.infer<typeof unitSchemaFormData>;

export type MeasurementForm = z.infer<typeof unitSchemaForm>;
export const UnitSchemaList = z.array(unitSchemaForm);
