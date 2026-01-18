/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable react/no-unescaped-entities */

"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LoginInput, loginSchema } from "@/app/schemas/auth.schema";
import { AuthService } from "@/app/services/auth.service";

import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { KeyRound, Mail, Lock, ShieldCheck, UserCog } from "lucide-react";
import GoogleLoginButton from "@/components/auth/GoogleLoginButton";

export default function LoginPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { register, handleSubmit, setValue, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });


  const handleDemoLogin = (role: 'ADMIN' | 'STAFF') => {
    if (role === 'ADMIN') {
      setValue("email", "samiha02@gmail.com");
      setValue("password", "123456");
      toast.info("Admin credentials loaded");
    } else {
      setValue("email", "samiha60@gmail.com");
      setValue("password", "123456");
      toast.info("Staff credentials loaded");
    }
  };

  const onSubmit = async (data: LoginInput) => {
    try {
      const result = await AuthService.login(data);
      if (result) {
        await queryClient.invalidateQueries({ queryKey: ["me"] });
        
      
        const role = result?.data?.user?.role;
        toast.success(`Welcome back! Logged in as ${role}`);

        if (role === "ADMIN") router.push("/admin/dashboard");
        else if (role === "STAFF") router.push("/staff/dashboard");
        else router.push("/");

        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-gray-50 dark:bg-[#0f111a] transition-colors duration-300">
      
  
      <div className="hidden lg:flex lg:w-1/2 bg-primary text-white flex-col justify-center items-center p-12 lg:p-20 relative overflow-hidden">
        <div className="absolute -top-10 -left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="max-w-md text-center space-y-6 relative z-10">
          <h1 className="text-4xl xl:text-6xl font-black leading-tight tracking-tight">
            Welcome Back 👋
          </h1>
          <p className="text-lg xl:text-xl opacity-90 leading-relaxed font-light">
            Secure, fast, and professional authentication system for your shopping experience.
          </p>
          <div className="pt-8">
            <div className="inline-flex items-center gap-2 p-4 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/20 text-sm font-medium">
              <ShieldCheck className="text-pink-400" /> Explore the latest Mom & Baby collections.
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8 md:p-12">
        <div className="w-full max-w-112.5 bg-white dark:bg-[#1a1d2b] p-6 sm:p-10 rounded-3xl sm:rounded-[40px] shadow-xl dark:shadow-none border border-gray-100 dark:border-gray-800">
          
          <div className="mb-8 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">
              Login
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-medium">
              Please enter your details to stay connected.
            </p>
          </div>

          {/* Demo Access Buttons */}
          <div className="mb-8 p-4 bg-gray-50 dark:bg-gray-800/40 rounded-2xl border border-dashed border-gray-200 dark:border-gray-700">
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[2px] mb-3 text-center">
              Quick Demo Access
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleDemoLogin('ADMIN')}
                className="flex items-center justify-center gap-2 py-2.5 px-2 text-[11px] font-bold bg-white dark:bg-gray-800 text-primary border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-primary hover:text-white transition-all shadow-sm"
              >
                <KeyRound size={14} /> Admin
              </button>
              <button
                type="button"
                onClick={() => handleDemoLogin('STAFF')}
                className="flex items-center justify-center gap-2 py-2.5 px-2 text-[11px] font-bold bg-white dark:bg-gray-800 text-pink-500 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-pink-500 hover:text-white transition-all shadow-sm"
              >
                <UserCog size={14} /> Staff
              </button>
            </div>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-1">
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="Email Address" 
                  {...register("email")} 
                  className="h-14 pl-12 rounded-2xl border-gray-100 dark:border-gray-800 dark:bg-gray-900 focus:ring-primary focus:border-primary"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium italic">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-1">
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="password" 
                  placeholder="Password" 
                  {...register("password")} 
                  className="h-14 pl-12 rounded-2xl border-gray-100 dark:border-gray-800 dark:bg-gray-900 focus:ring-primary focus:border-primary"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 ml-1 font-medium italic">{errors.password.message}</p>
              )}
              <div className="flex justify-end mt-2">
                <Link href="#" className="text-xs text-primary font-bold hover:underline">
                  Forgot Password?
                </Link>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold rounded-2xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Verifying..." : "Login"}
            </Button>

            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-gray-100 dark:border-gray-800"></span>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-gray-400">
                <span className="bg-white dark:bg-[#1a1d2b] px-4">Or continue with</span>
              </div>
            </div>

            <div className="w-full flex justify-center">
              <GoogleLoginButton />
            </div>

            <p className="text-sm text-center mt-8 text-gray-600 dark:text-gray-400">
              Don't have an account?{" "}
              <Link href="/register" className="text-pink-600 font-bold hover:underline">
                Register Now
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}