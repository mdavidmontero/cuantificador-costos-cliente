import type { User } from "../schemas";

export interface LoginFormData {
  email: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  nameOrganization: string;
  nit: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
