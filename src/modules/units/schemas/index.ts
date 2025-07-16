import { z } from "zod";

export const unitSchemaForm = z.object({
  id: z.number(),
  name: z.string(),
});

export type MeasurementForm = z.infer<typeof unitSchemaForm>;
export const UnitSchemaList = z.array(unitSchemaForm);
