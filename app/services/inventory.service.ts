import axiosInstance from "@/app/utils/axiosInstance";

export const InventoryService = {

  getAll: async () => {
    const response = await axiosInstance.get("/inventory");
    return response.data;
  },

  updateStock: async (productId: string, quantity: number) => {
    const response = await axiosInstance.patch(`/inventory/${productId}`, {
      quantity,
    });
    return response.data;
  },
};