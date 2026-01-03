
import axiosInstance from "../utils/axiosInstance";

export const AuthService = {

  register: async (data: {
    name: string;
    email: string;
    password: string;
  }) => {
    const res = await axiosInstance.post("/auth/register", data);
    return res.data.data;
  },



 login: async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/login", data);

  
  if (res.data.success && res.data.data.accessToken) {
    const token = res.data.data.accessToken; 

    
    if (typeof window !== "undefined") {
      localStorage.setItem("accessToken", token);
    }

  
    document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Lax`;
    
    console.log("Login Success: Token stored in LocalStorage and Cookie");
  }
  
  return res.data.data;
},

  logout: async () => {
  try {
 
    await axiosInstance.post("/auth/logout");
  } catch (error) {
    console.error("Logout backend error:", error);
  } finally {
  
    localStorage.removeItem("accessToken");
    localStorage.clear(); 
    sessionStorage.clear();
    

    window.location.href = "/login";
  }
}

}