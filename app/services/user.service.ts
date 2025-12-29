import axiosInstance from "@/app/utils/axiosInstance";

export const UserService = {
  // ADMIN: get all users
  getAll: async () => {
    const res = await axiosInstance.get("/user");
    return res.data.data;
  },

  // ADMIN: delete user
  delete: async (id: string) => {
    const res = await axiosInstance.delete(`/user/${id}`);
    return res.data;
  },
};
