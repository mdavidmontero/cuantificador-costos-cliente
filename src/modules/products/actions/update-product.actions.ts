import costsApi from "@/api/costApi";
import { isAxiosError } from "axios";
import type { ProductoForm } from "../schemas";
interface updateUnitFormData {
  productId: ProductoForm["id"];
  formData: ProductoForm;
}
export const updateProducts = async ({
  productId,
  formData,
}: updateUnitFormData) => {
  try {
    const { data } = await costsApi.patch(
      `/product/update-product/${productId}`,
      formData
    );
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
};
