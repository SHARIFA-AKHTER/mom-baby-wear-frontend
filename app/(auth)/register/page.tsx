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


// "use client";

// import { useForm } from "react-hook-form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/navigation";
// import Link from "next/link";

// import { AuthService } from "@/app/services/auth.service";


// interface RegisterFormValues {
//   name: string;
//   email: string;
//   password: string;
//   role?: "ADMIN" | "MANAGER" | "STAFF" | "CUSTOMER";
// }

// export default function RegisterPage() {
//   const router = useRouter();
  
//   const { 
//     register, 
//     handleSubmit, 
//     formState: { errors, isSubmitting } 
//   } = useForm<RegisterFormValues>({
   
//     defaultValues: {
//       role: "CUSTOMER"
//     }
//   });

//  const onSubmit = async (values: RegisterFormValues) => {
//   try {
    
//     const dataToSend = {
//       name: values.name,
//       email: values.email,
//       password: values.password,
//       role: values.role || "CUSTOMER",
//     };

//     console.log("Sending Data:", dataToSend);
   
//     await AuthService.register(dataToSend);
//     router.replace("/login");
//   } catch (error: any) {
//     alert(error?.response?.data?.message || "Registration failed");
//   }
// };

//   return (
//     <div className="min-h-screen flex flex-col lg:flex-row">
//       {/* Left Branding */}
//       <div className="hidden lg:flex flex-1 bg-pink-600 text-white flex-col justify-center items-center p-10">
//         <h1 className="text-4xl font-bold mb-4">Join Us 👋</h1>
//         <p className="text-lg text-center max-w-md">
//           Create your account to access secure, fast and professional services for your baby.
//         </p>
//       </div>

//       {/* Auth Form */}
//       <div className="flex flex-1 items-center justify-center p-4 sm:p-6 lg:p-10 bg-gray-50">
//         <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-xl shadow-md">
//           <h2 className="text-2xl font-bold text-center mb-6">Create an account</h2>
          
//           <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//             {/* Name Input */}
//             <div className="space-y-1">
//               <Input placeholder="Full Name" {...register("name", { required: "Name is required" })} />
//               {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
//             </div>

//             {/* Email Input */}
//             <div className="space-y-1">
//               <Input placeholder="Email" {...register("email", { required: "Email is required" })} />
//               {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
//             </div>

//             {/* Password Input */}
//             <div className="space-y-1">
//               <Input type="password" placeholder="Password" {...register("password", { required: "Password is required" })} />
//               {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
//             </div>

//             {/* Role Selection Dropdown */}
//             <div className="space-y-1">
//               <label className="text-xs font-semibold text-gray-500 ml-1 uppercase">Join As</label>
//               <select
//                 {...register("role")}
//                 className="w-full h-10 px-3 py-2 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
//               >
//                 <option value="CUSTOMER">Customer (Shopping)</option>
//                 <option value="STAFF">Staff (Inventory)</option>
//               </select>
//             </div>

//             <Button 
//               type="submit" 
//               className="w-full bg-pink-600 hover:bg-pink-700 mt-2" 
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? "Creating account..." : "Register"}
//             </Button>

//             <p className="text-sm text-center mt-4">
//               Already have an account?{" "}
//               <Link href="/login" className="text-pink-600 font-bold hover:underline">Login</Link>
//             </p>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }