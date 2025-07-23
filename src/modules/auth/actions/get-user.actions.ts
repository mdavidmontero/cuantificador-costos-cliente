import costsApi from "@/api/costApi";
import { userSchema } from "../schemas";
import { isAxiosError } from "axios";

export async function getUser() {
  try {
    const { data } = await costsApi("/auth/user");
    console.log(data);
    const response = userSchema.safeParse(data);
    console.log(response);
    if (response.success) {
      return response.data;
    }
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error);
    }
  }
}
