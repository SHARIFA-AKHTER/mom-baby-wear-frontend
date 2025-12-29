import axiosInstance from "@/app/utils/axiosInstance";

export const UserService = {
  // ADMIN: get all users
  getAll: async () => {
    const res = await axiosInstance.get("/users");
    return res.data.data;
  },

  // ADMIN: delete user
  delete: async (id: string) => {
    const res = await axiosInstance.delete(`/users/${id}`);
    return res.data;
  },
};
