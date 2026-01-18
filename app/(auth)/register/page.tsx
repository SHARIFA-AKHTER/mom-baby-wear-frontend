// /* eslint-disable @typescript-eslint/no-explicit-any */


// "use client";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { RegisterInput, registerSchema } from "@/app/schemas/auth.schema";
// import { AuthService } from "@/app/services/auth.service";

// export default function RegisterPage() {
//   const router = useRouter();
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
//     resolver: zodResolver(registerSchema),
//   });

//   const onSubmit = async (data: RegisterInput) => {
//     console.log("register data:", data);
//     try {
//       await AuthService.register(data);
//       router.replace("/login");
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row">
//       {/* Left Branding */}
//       <div className="hidden lg:flex flex-1 bg-primary text-white flex-col justify-center items-center p-10">
//         <h1 className="text-4xl font-bold mb-4">Join Us 👋</h1>
//         <p className="text-lg text-center max-w-md">
//           Create your account to access secure, fast and professional services
//         </p>
//       </div>

//       {/* Auth Form */}
//       <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-10 bg-gray-50">
//         <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md">
//           <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             <Input placeholder="Full Name" {...register("name")} />
//             {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

//             <Input placeholder="Email" {...register("email")} />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

//             <Input type="password" placeholder="Password" {...register("password")} />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

//             <Button type="submit" className="w-full" disabled={isSubmitting}>
//               {isSubmitting ? "Creating account..." : "Register"}
//             </Button>

//             <p className="text-sm text-center mt-4">
//               Already have an account?{" "}
//               <Link href="/login" className="text-pink-600 font-medium">Login</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }


/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { RegisterInput, registerSchema } from "@/app/schemas/auth.schema";
import { AuthService } from "@/app/services/auth.service";
import { toast } from "sonner";
import { User, Mail, Lock, UserPlus, ShieldCheck } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    try {
      await AuthService.register(data);
      toast.success("Account created successfully! Please login.");
      router.replace("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-gray-50 dark:bg-[#0f111a] transition-colors duration-300">
      
      {/* Left Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex flex-1 bg-primary text-white flex-col justify-center items-center p-12 lg:p-20 relative overflow-hidden">
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"></div>
        <div className="max-w-md text-center space-y-6 relative z-10">
          <div className="inline-block p-3 bg-white/10 rounded-2xl backdrop-blur-md mb-4">
             <UserPlus size={40} className="text-pink-300" />
          </div>
          <h1 className="text-4xl xl:text-6xl font-black leading-tight tracking-tight">
            Start Your <br /> Journey 👋
          </h1>
          <p className="text-lg xl:text-xl opacity-80 leading-relaxed font-light">
            Join thousands of users and enjoy a premium shopping and management experience.
          </p>
          <div className="pt-6 flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-widest opacity-60">
             <span className="flex items-center gap-2"><ShieldCheck size={16}/> Secure</span>
             <span>•</span>
             <span>Fast</span>
             <span>•</span>
             <span>Reliable</span>
          </div>
        </div>
      </div>

      {/* Auth Form Section */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16">
        <div className="w-full max-w-120 bg-white dark:bg-[#1a1d2b] p-8 sm:p-12 rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-800 transition-all">
          
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter uppercase italic">
              Register
            </h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 font-bold uppercase tracking-tight">
              Create your account in seconds
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="John Doe" 
                  {...register("name")} 
                  className="h-14 pl-12 rounded-2xl border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[10px] mt-1 ml-1 font-black uppercase tracking-tighter italic">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  placeholder="name@example.com" 
                  {...register("email")} 
                  className="h-14 pl-12 rounded-2xl border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] mt-1 ml-1 font-black uppercase tracking-tighter italic">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Create Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <Input 
                  type="password" 
                  placeholder="••••••••" 
                  {...register("password")} 
                  className="h-14 pl-12 rounded-2xl border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-[10px] mt-1 ml-1 font-black uppercase tracking-tighter italic">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/30 transition-all active:scale-[0.96] mt-4" 
              disabled={isSubmitting}
            >
              {isSubmitting ? "Processing..." : "Create Account"}
            </Button>

            <p className="text-[11px] text-center mt-8 text-gray-500 dark:text-gray-400 font-bold uppercase tracking-tight">
              Already a member?{" "}
              <Link href="/login" className="text-pink-600 font-black hover:text-pink-700 underline decoration-2 underline-offset-4">
                Login Here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}