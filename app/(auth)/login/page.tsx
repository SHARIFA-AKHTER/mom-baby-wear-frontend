/* eslint-disable @typescript-eslint/no-explicit-any */


// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { LoginInput, loginSchema } from "@/app/schemas/auth.schema";
// import { AuthService } from "@/app/services/auth.service";

// export default function LoginPage() {
//   const router = useRouter();

//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data: LoginInput) => {
//     console.log("Login data:", data);
//     try {
//       await AuthService.login(data);
//       router.replace("/");
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Login failed");
//     }
//   };

//   const handleGoogleLogin = () => {
//     // Redirect to your backend Google OAuth route
//     window.location.href = "/auth/google";
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
//       >
//         <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

//         <div className="space-y-4">
//           <div>
//             <Input placeholder="Email" {...register("email")} />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//           </div>

//           <div>
//             <Input type="password" placeholder="Password" {...register("password")} />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Logging in..." : "Login"}
//           </Button>

//           <Button type="button" variant="outline" className="w-full mt-2" onClick={handleGoogleLogin}>
//             Login with Google
//           </Button>
//         </div>

//         <p className="text-sm text-center mt-4">
//           Don&apos;t have an account?{" "}
//           <Link href="/register" className="text-pink-600 font-medium">Register</Link>
//         </p>
//       </form>
//     </div>
//   );
// }


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

export default function LoginPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginInput) => {
    console.log("Login data:", data);
    try {
      await AuthService.login(data);
      router.replace("/");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Branding */}
      <div className="hidden lg:flex flex-1 bg-primary text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Welcome Back 👋</h1>
        <p className="text-lg text-center max-w-md">
          Secure, fast and professional authentication system
        </p>
      </div>

      {/* Auth Form */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-10 bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <Input type="password" placeholder="Password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>

            <GoogleLoginButton />

            <p className="text-sm text-center mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-pink-600 font-medium">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
