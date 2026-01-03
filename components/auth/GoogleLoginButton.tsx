/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

export default function GoogleLoginButton() {
  const router = useRouter();
  const queryClient = useQueryClient();


  const handleGoogleSuccess = async (response: any) => {
    try {
      const idToken = response.credential;
      const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
      
      const res = await axios.post(apiUrl, { idToken });

      if (res.data.success) {
        const token = res.data.data.accessToken;


        Cookies.set("accessToken", token, { expires: 7 });
        

        localStorage.setItem("accessToken", token);

        toast.success("Login Successful!");

        
        await queryClient.invalidateQueries({ queryKey: ["me"] });

       
        router.replace("/");
        router.refresh();
      }
    } catch (error: any) {
      console.error("Google Login Error:", error);
      toast.error(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="w-full">
      <style jsx global>{`
        .google-login-wrapper iframe {
          width: 100% !important;
          max-width: 100% !important;
          left: 0 !important;
        }
        .google-login-wrapper > div {
          width: 100% !important;
        }
      `}</style>

      <div className="google-login-wrapper w-full flex justify-center">
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => toast.error("Login failed")}
          theme="outline"
          shape="pill"
          width="350" 
          text="continue_with"
        />
      </div>
    </div>
  );
}