/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/immutability */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginInput, loginSchema } from "@/app/schemas/auth.schema";
import { AuthService } from "@/app/services/auth.service";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  // const onSubmit = async (data: LoginInput) => {
  //   try {
  //     await AuthService.login(data);
  //     toast.success("Welcome back!");
      
  //     await queryClient.invalidateQueries({ queryKey: ["me"] });
  //     router.replace("/");
  //     setTimeout(() => router.refresh(), 100); 
  //   } catch (error: any) {
  //     toast.error(error?.response?.data?.message || "Login failed");
  //   }
  // };

  const onSubmit = async (data: { email: string; password: string; }) => {
  try {
    const result = await AuthService.login(data);
    if (result) {
       
        queryClient.invalidateQueries({ queryKey: ["me"] });
        
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      console.error("Login Error", error);
    }
};
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50">
      
 
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-white flex-col justify-center items-center p-12 lg:p-20">
        <div className="max-w-md text-center space-y-6">
          <h1 className="text-4xl xl:text-5xl font-black leading-tight tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-lg xl:text-xl opacity-90 leading-relaxed font-light">
            Secure, fast, and professional authentication system for your shopping experience.
          </p>
          <div className="pt-8">
            <div className="inline-block p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 text-sm font-medium">
              Explore the latest Mom & Baby collections.
            </div>
          </div>
        </div>
      </div>


      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-105 bg-white p-6 sm:p-10 rounded-2xl sm:rounded-[32px] shadow-sm sm:shadow-xl border border-gray-100 transition-all">
          
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center lg:text-left">
              Login
            </h2>
            <p className="text-gray-500 text-sm mt-2 text-center lg:text-left font-medium">
              Please enter your details to stay connected.
            </p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            <div>
              <Input 
                placeholder="Email Address" 
                {...register("email")} 
                className="h-12 sm:h-14 rounded-xl border-gray-200 focus:ring-primary focus:border-primary"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <Input 
                type="password" 
                placeholder="Password" 
                {...register("password")} 
                className="h-12 sm:h-14 rounded-xl border-gray-200 focus:ring-primary focus:border-primary"
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1.5 ml-1 font-medium italic">
                  {errors.password.message}
                </p>
              )}
              <div className="flex justify-end mt-2">
                <Link href="#" className="text-xs text-primary font-bold hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 sm:h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-4 text-gray-400 font-bold tracking-wider">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <GoogleLoginButton />
            </div>

            <p className="text-sm text-center mt-8 text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="text-pink-600 font-bold hover:underline decoration-2">
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
