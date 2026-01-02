import axiosInstance from "../utils/axiosInstance";

export const ReviewService = {

  getByProductId: async (productId: string) => {
    const res = await axiosInstance.get(`/review/product/${productId}`);
    return res.data;
  },


  create: async (data: { productId: string; rating: number; comment: string }) => {
    const res = await axiosInstance.post("/review", data);
    return res.data.data;
  },


  getAll: async () => {
    const res = await axiosInstance.get("/review");
    return res.data;
  },


  approve: async (id: string) => {
    const res = await axiosInstance.patch(`/review/approve/${id}`);
    return res.data;
  },


  delete: async (id: string) => {
    const res = await axiosInstance.delete(`/review/${id}`);
    return res.data;
  },
};