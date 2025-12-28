
import axiosInstance from "@/app/utils/axiosInstance";

export const CategoryService = {
  getAll: async () => {
    const res = await axiosInstance.get("/category"); 
    return res.data;
  }
};