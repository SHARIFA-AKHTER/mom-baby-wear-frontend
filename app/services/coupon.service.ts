/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "../utils/axiosInstance";

export const CouponService = {
  getAll: async () => {
    const res = await axiosInstance.get("/coupon");
    return res.data?.data || res.data;
  },
  create: async (data: any) => {
    const res = await axiosInstance.post("/coupon", data);
    return res.data;
  },
  delete: async (id: string) => {
    const res = await axiosInstance.delete(`/coupon/${id}`);
    return res.data;
  }
};