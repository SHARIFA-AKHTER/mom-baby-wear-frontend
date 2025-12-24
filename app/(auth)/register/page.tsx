/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
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
//     console.log("Form data:", data); // debug
//     try {
//       await AuthService.register(data);
//       router.replace("/login");
//     } catch (error: any) {
//       alert(error?.response?.data?.message || "Registration failed");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
//       >
//         <h1 className="text-2xl font-bold mb-6 text-center">Create an account</h1>

//         <div className="space-y-4">
//           <div>
//             <Input placeholder="Full Name" {...register("name")} />
//             {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
//           </div>

//           <div>
//             <Input placeholder="Email" {...register("email")} />
//             {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
//           </div>

//           <div>
//             <Input type="password" placeholder="Password" {...register("password")} />
//             {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
//           </div>

//           <Button type="submit" className="w-full" disabled={isSubmitting}>
//             {isSubmitting ? "Creating account..." : "Register"}
//           </Button>
//         </div>

//         <p className="text-sm text-center mt-4">
//           Already have an account?{" "}
//           <Link href="/login" className="text-pink-600 font-medium">Login</Link>
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
import { RegisterInput, registerSchema } from "@/app/schemas/auth.schema";
import { AuthService } from "@/app/services/auth.service";

export default function RegisterPage() {
  const router = useRouter();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterInput) => {
    console.log("register data:", data);
    try {
      await AuthService.register(data);
      router.replace("/login");
    } catch (error: any) {
      alert(error?.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Branding */}
      <div className="hidden lg:flex flex-1 bg-primary text-white flex-col justify-center items-center p-10">
        <h1 className="text-4xl font-bold mb-4">Join Us 👋</h1>
        <p className="text-lg text-center max-w-md">
          Create your account to access secure, fast and professional services
        </p>
      </div>

      {/* Auth Form */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-10 bg-gray-50">
        <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input placeholder="Full Name" {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <Input placeholder="Email" {...register("email")} />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <Input type="password" placeholder="Password" {...register("password")} />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Register"}
            </Button>

            <p className="text-sm text-center mt-4">
              Already have an account?{" "}
              <Link href="/login" className="text-pink-600 font-medium">Login</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
