/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
export default function GoogleLoginButton() {
  const router = useRouter();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
      
        console.log(tokenResponse);
      } catch (error) {
        toast.error("Google Login Failed");
      }
    },
    onError: () => toast.error("Login failed. Try again."),
  });

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
          onSuccess={async (response: any) => {
            try {
              const idToken = response.credential;
              const apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/google`;
              const res = await axios.post(apiUrl, { idToken });

              if (res.data.success) {
                toast.success("Login Successful!");
                localStorage.setItem("accessToken", res.data.data.accessToken);
                router.replace("/");
                router.refresh();
              }
            } catch (error: any) {
              toast.error(error.response?.data?.message || "Login Failed");
            }
          }}
          onError={() => toast.error("Login failed")}
          theme="outline"
          shape="pill"
          width="100%" 
          text="continue_with"
        />
      </div>
    </div>
  );
}