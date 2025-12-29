import axiosInstance from "@/app/utils/axiosInstance";

export const OrderService = {
  // ADMIN / STAFF
  getAll: async () => {
    const res = await axiosInstance.get("/order");
    return res.data.data;
  },

  // ADMIN / STAFF
  updateStatus: async (id: string, status: string) => {
    const res = await axiosInstance.patch(`/order/${id}/status`, { status });
    return res.data;
  },

  // ADMIN only
  delete: async (id: string) => {
    const res = await axiosInstance.delete(`/order/${id}`);
    return res.data;
  },
};
