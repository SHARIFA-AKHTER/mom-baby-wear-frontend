
import axiosInstance from "../utils/axiosInstance";

export const AuthService = {
login: async (data: { email: string; password: string }) => {
  const res = await axiosInstance.post("/auth/login", data);

  if (res.data.success && res.data.data.accessToken) {
    const token = res.data.data.accessToken;
 
    document.cookie = `accessToken=${token}; path=/; max-age=86400; SameSite=Lax`;
    console.log("Cookie successfully set");
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
  
  
// logout: async () => {
//     try {
      
//       await axiosInstance.post("/auth/logout");

     
//       localStorage.removeItem("token");
//       localStorage.clear();
      
//     } catch (error) {
//       console.error("Logout failed:", error);
    
//       localStorage.clear();
//     }
//   },
// }

logout: async () => {
  try {

    await axiosInstance.post("/auth/logout");


    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;

      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }


    localStorage.clear();
    sessionStorage.clear();

  } catch (error) {
    console.error("Logout failed:", error);

    localStorage.clear();
    sessionStorage.clear();
  }
},
}