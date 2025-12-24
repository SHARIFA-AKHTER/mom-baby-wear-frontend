import axiosInstance from "../utils/axiosInstance";


export const AuthService = {
  login: async (data: { email: string; password: string }) => {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data;
  },
   me: async () => {
    const res = await axiosInstance.get("/auth/me", { withCredentials: true });
    return res.data.data;
  },
};

