
import axiosInstance from "../utils/axiosInstance";

export const AuthService = {
  login: async (data: { email: string; password: string }) => {
    const res = await axiosInstance.post("/auth/login", data);
    

    if (res.data.success && res.data.data.accessToken) {
      localStorage.setItem("token", res.data.data.accessToken);
    }
    
    return res.data.data;
  },

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data.data;
  },
  
  
  logout: () => {
    localStorage.removeItem("token");
  }
};