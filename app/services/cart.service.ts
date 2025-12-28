import axiosInstance from "@/app/utils/axiosInstance";

export const CartService = {
  getCart: async () => {
    const res = await axiosInstance.get("/cart");
    return res.data.data;
  },

  addToCart: async (payload: { productId: string; quantity: number }) => {
    const res = await axiosInstance.post("/cart/add", payload);
    return res.data;
  },

  removeFromCart: async (productId: string) => {
    const res = await axiosInstance.delete(`/cart/remove/${productId}`);
    return res.data;
  },

  clearCart: async () => {
    const res = await axiosInstance.delete("/cart/clear");
    return res.data;
  },
};
