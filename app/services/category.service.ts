/* eslint-disable @typescript-eslint/no-explicit-any */

// import axiosInstance from "@/app/utils/axiosInstance";

// export const CategoryService = {
//   getAll: async () => {
//     const res = await axiosInstance.get("/category"); 
//     return res.data;
//   }
// };

import axiosInstance from "@/app/utils/axiosInstance";

export const CategoryService = {
 
  getAll: async () => {
    const res = await axiosInstance.get("/category");
    return res.data;
  },


  getOne: async (id: string) => {
    const res = await axiosInstance.get(`/category/${id}`);
    return res.data;
  },


  create: async (data: { name: string; image: string; description?: string }) => {
    const res = await axiosInstance.post("/category", data);
    return res.data;
  },


  update: async (id: string, data: any) => {
    const res = await axiosInstance.patch(`/category/${id}`, data);
    return res.data;
  },


  delete: async (id: string) => {
    const res = await axiosInstance.delete(`/category/${id}`);
    return res.data;
  },
};