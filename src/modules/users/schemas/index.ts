import { z } from "zod";

export const UserSchemaForm = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  role: z.string(),
});

export const UserSchemaFormData = UserSchemaForm.omit({
  id: true,
});

export type UserSchemaFormData = z.infer<typeof UserSchemaFormData>;
export type UserSchema = z.infer<typeof UserSchemaForm>;
export const UserSchemaList = z.array(UserSchemaForm);

export const ListSchemaUser = z
  .object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    password: z.string(),
    confirmed: z.boolean(),
    role: z.string(),
    token: z.string(),
    image: z.null(),
    organizationId: z.string(),
    createdAt: z.string(),
    updatedAt: z.string(),
  })
  .optional();
export type ListSchemaUser = z.infer<typeof ListSchemaUser>;
export const ListSchemaUserSchema = z.array(ListSchemaUser);
