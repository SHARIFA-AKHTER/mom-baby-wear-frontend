/* eslint-disable react-hooks/set-state-in-effect */

// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
// import { toast } from "sonner";
// import { useRouter } from "next/navigation";
// import { useQueryClient } from "@tanstack/react-query";
// import Cookies from "js-cookie";
// import { useEffect, useState } from "react";

// export default function GoogleLoginButton() {
//   const router = useRouter();
//   const queryClient = useQueryClient();
//   const [mounted, setMounted] = useState(false);


//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const handleGoogleSuccess = async (response: any) => {
//     try {
//       const idToken = response.credential;
//       const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
      
//       const res = await axios.post(apiUrl, { idToken }, { withCredentials: true });

//       if (res.data.success) {
//         const token = res.data.data.accessToken;

//         Cookies.set("accessToken", token, { 
//           expires: 7,
//           secure: true, 
//           sameSite: 'none' 
//         });

//         localStorage.setItem("accessToken", token);
//         toast.success("Login Successful!");

//         await queryClient.invalidateQueries({ queryKey: ["me"] });

       
//         const role = res.data?.data?.user?.role;
//         if (role === "ADMIN") router.push("/admin/dashboard");
//         else if (role === "STAFF") router.push("/staff/dashboard");
//         else router.push("/");

//         router.refresh();
//       }
//     } catch (error: any) {
//       console.error("Google Login Error:", error);
//       toast.error(error.response?.data?.message || "Login Failed");
//     }
//   };

//   if (!mounted) return null;

//   return (
//     <div className="w-full flex justify-center">
      
//       <style jsx global>{`
//         .google-login-container {
//           width: 100% !important;
//           display: flex !important;
//           justify-content: center !important;
//         }
//         .google-login-container > div {
//           width: 100% !important;
//           max-width: 400px !important; 
//           min-width: 280px !important;
//         }
//         @media (max-width: 640px) {
//           .google-login-container > div {
//             max-width: 100% !important;
//           }
//         }
//       `}</style>

//       <div className="google-login-container overflow-hidden rounded-full">
//         <GoogleLogin
//           onSuccess={handleGoogleSuccess}
//           onError={() => toast.error("Login failed")}
//           theme="outline" 
//           shape="pill"
//           width="100%" 
//           size="large"
//           text="continue_with"
//         />
//       </div>
//     </div>
//   );
// }

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export default function GoogleLoginButton() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoogleSuccess = async (response: any) => {
    try {
      const idToken = response.credential;
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
      
      const res = await axios.post(apiUrl, { idToken }, { withCredentials: true });

      if (res.data.success) {
        const token = res.data.data.accessToken;

        Cookies.set("accessToken", token, { 
          expires: 7,
          secure: true, 
          sameSite: 'none' 
        });

        localStorage.setItem("accessToken", token);
        toast.success("Login Successful!");

        await queryClient.invalidateQueries({ queryKey: ["me"] });

        const role = res.data?.data?.user?.role;
        if (role === "ADMIN") router.push("/admin/dashboard");
        else if (role === "STAFF") router.push("/staff/dashboard");
        else router.push("/");

        router.refresh();
      }
    } catch (error: any) {
      console.error("Google Login Error:", error);
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  if (!mounted) return null;

  return (
    <div className="w-full">
    
      <div className="flex justify-center w-full">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Login failed")}
          theme="outline" 
          shape="pill"
          width="350px" 
          size="large"
          text="continue_with"
        />
      </div>

      <style jsx global>{`
  
        iframe[src*="accounts.google.com"] {
          width: 100% !important;
          margin: 0 auto !important;
        }

        div[id^="not_google_btn"], 
        div[id^="google_btn"] {
          width: 100% !important;
          max-width: 100% !important;
        }
      `}</style>
    </div>
  );
}