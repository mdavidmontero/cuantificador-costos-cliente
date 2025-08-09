import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;

export const RegisterFormSchema = z.object({
  name: z.string(),
  email: z.string(),
  password: z.string(),
  password_confirmation: z.string(),
  nameOrganization: z.string(),
  nit: z.string(),
});

export type RegisterFormData = z.infer<typeof RegisterFormSchema>;

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  roles: z.array(z.string()),
  image: z.string().nullable(),
  organizationId: z.string(),
  organization: z.object({
    name: z.string(),
    nit: z.string(),
  }),
});

export type User = z.infer<typeof userSchema>;
