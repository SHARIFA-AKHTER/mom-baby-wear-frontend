/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

// "use client";

// import LinkNext from "next/link";
// import Image from "next/image";
// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import { useAuthContext } from "@/app/providers/AuthProvider";
// import {
//   ChevronDown,
//   ShoppingCart,
//   Heart,
//   LayoutDashboard,
//   LogOut,
//   Menu,
//   X,
//   User as UserIcon,
//   Sun,
//   Moon
// } from "lucide-react";
// import { AuthService } from "@/app/services/auth.service";
// import { useQueryClient } from "@tanstack/react-query";
// import Cookies from "js-cookie";
// import { initTheme, toggleTheme } from "@/app/utils/theme";


// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const [currentTheme, setCurrentTheme] = useState("light");

//   const queryClient = useQueryClient();
//   const { data: user, isLoading } = useAuthContext();


//   useEffect(() => {
//     setCurrentTheme(initTheme());
//   }, []);

  
//   const handleThemeToggle = () => {
//     const newTheme = toggleTheme();
//     setCurrentTheme(newTheme);
//   };
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//         const res = await fetch(`${API_URL}/category`);
//         const json = await res.json();
//         if (json.success) setCategories(json.data);
//       } catch (error) {
//         console.error("Failed to fetch categories:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const getDashboardLink = () => {
//     if (!user) return "/login";
//     const role = user.role;

//     if (role === "ADMIN" || role === "MANAGER") return "/admin/dashboard";
//     if (role === "STAFF") return "/staff/dashboard";

//     return "/profile";
//   };

//   const isAdmin = user?.role === "ADMIN" || user?.role === "MANAGER";

//   const handleLogout = async () => {
//     try {
//       await AuthService.logout();
//       queryClient.clear();
//       Cookies.remove("accessToken");
//       localStorage.clear();
//       window.location.href = "/login";
//     } catch (error) {
//       console.error("Logout failed:", error);
//       window.location.href = "/login";
//     }
//   };

//   return (
//     <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo Section */}
//         <LinkNext href="/" className="flex items-center gap-2 shrink-0">
//           <Image
//             src="/logo.jpeg"
//             alt="Logo"
//             width={35}
//             height={35}
//             className="rounded-full object-cover border border-pink-100"
//           />
//           <span className="text-lg font-bold text-pink-600 hidden md:block">
//             Mom & Baby Wear
//           </span>
//         </LinkNext>

//         {/* Desktop Navigation Links */}
//         <nav className="hidden lg:flex items-center gap-6 text-[14px] font-medium text-gray-600">
//           <LinkNext
//             href="/products"
//             className="hover:text-pink-600 transition-colors"
//           >
//             Products
//           </LinkNext>

//           <div className="relative group py-4">
//             <button className="flex items-center gap-1 hover:text-pink-600 font-semibold">
//               Categories <ChevronDown size={14} />
//             </button>
//             <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-lg hidden group-hover:block animate-in fade-in slide-in-from-top-2">
//               <div className="py-2">
//                 {categories.length > 0 ? (
//                   categories.map((cat: any) => (
//                     <LinkNext
//                       key={cat.id}
//                       href={`/categories/${cat.id}`}
//                       className="block px-4 py-2 hover:bg-pink-50 hover:text-pink-600 border-b last:border-0 border-gray-50 text-sm"
//                     >
//                       {cat.name}
//                     </LinkNext>
//                   ))
//                 ) : (
//                   <p className="px-4 py-2 text-xs text-gray-400">Loading...</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </nav>

//         {/* Icons & Auth Section */}
//         <div className="flex items-center gap-1 sm:gap-3">

//          <Button variant="ghost" size="icon" onClick={handleThemeToggle} className="rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800">
//               {currentTheme === "light" ? <Moon size={20} /> : <Sun size={20} className="text-yellow-500" />}
//             </Button>
//           <LinkNext
//             href="/wishlist"
//             className="p-2 text-gray-600 hover:text-pink-600 relative"
//           >
//             <Heart size={22} />
//           </LinkNext>

//           <LinkNext
//             href="/cart"
//             className="p-2 text-gray-600 hover:text-pink-600 relative mr-2"
//           >
//             <ShoppingCart size={22} />
//           </LinkNext>

//           {isLoading ? (
//             <div className="h-8 w-8 bg-gray-100 rounded-full animate-pulse"></div>
//           ) : user ? (
//             <div className="flex items-center gap-3 border-l pl-4">
//               <LinkNext
//                 href={getDashboardLink()}
//                 className="hidden md:block text-sm font-semibold text-gray-700 hover:text-pink-600"
//               >
//                 {isAdmin ? "Dashboard" : "My Profile"}
//               </LinkNext>

           

//               <div className="flex items-center gap-2">
   
//                 <div className="relative w-8 h-8">
//                   {user.profileImage ? (
//                     <Image
//                       src={user.profileImage} 
//                       alt="User Profile"
//                       fill
//                       className="rounded-full border border-pink-200 object-cover"
//                     />
//                   ) : (
                    
//                     <Image
//                       src="https://www.shutterstock.com/image-photo/indian-baby-girl-sitting-on-600nw-2168016381.jpg" 
//                       alt="Default Profile"
//                       fill
//                       className="rounded-full border border-pink-200 object-cover"
//                     />
//                   )}
//                 </div>

//                 <span className="hidden md:block text-sm font-medium text-gray-700">
//                   {user.name || user.email?.split("@")[0]}
//                 </span>

//                 <Button
//                   variant="ghost"
//                   size="icon"
//                   className="text-gray-400 hover:text-red-500"
//                   onClick={handleLogout}
//                 >
//                   <LogOut size={20} />
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             <LinkNext href="/login">
//               <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-6 text-sm font-bold">
//                 Login
//               </Button>
//             </LinkNext>
//           )}

//           <button
//             onClick={() => setOpen(!open)}
//             className="lg:hidden p-2 text-gray-600 border rounded-md ml-2"
//           >
//             {open ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Sidebar */}
//       {open && (
//         <div className="lg:hidden fixed inset-0 top-16 bg-white z-50 border-t p-5 animate-in slide-in-from-right w-full">
//           <div className="space-y-4">
//             <LinkNext
//               onClick={() => setOpen(false)}
//               href="/products"
//               className="block p-4 bg-gray-50 rounded-xl font-semibold"
//             >
//               Products
//             </LinkNext>

//             {user && (
//               <LinkNext
//                 onClick={() => setOpen(false)}
//                 href={getDashboardLink()}
//                 className="block p-4 bg-pink-50 text-pink-600 rounded-xl font-bold items-center gap-2"
//               >
//                 <LayoutDashboard size={18} />

//                 {isAdmin ? "Admin Dashboard" : "My Profile"}
//               </LinkNext>
//             )}

//             {!user && (
//               <LinkNext
//                 onClick={() => setOpen(false)}
//                 href="/login"
//                 className="block text-center bg-pink-600 text-white py-4 rounded-xl font-bold"
//               >
//                 Login / Register
//               </LinkNext>
//             )}

//             {user && (
//               <button
//                 onClick={handleLogout}
//                 className="w-full text-center py-4 text-red-500 font-bold border border-red-100 rounded-xl bg-red-50"
//               >
//                 Sign Out
//               </button>
//             )}
//           </div>
//         </div>
//       )}
//     </header>
//   );
// }


/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import LinkNext from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/app/providers/AuthProvider";
import {
  ChevronDown,
  ShoppingCart,
  Heart,
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  Sun,
  Moon
} from "lucide-react";
import { AuthService } from "@/app/services/auth.service";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { initTheme, toggleTheme } from "@/app/utils/theme";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [currentTheme, setCurrentTheme] = useState("light");

  const queryClient = useQueryClient();
  const { data: user, isLoading } = useAuthContext();

  useEffect(() => {
    setCurrentTheme(initTheme());
  }, []);

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API_URL}/category`);
        const json = await res.json();
        if (json.success) setCategories(json.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const getDashboardLink = () => {
    if (!user) return "/login";
    const role = user.role;
    if (role === "ADMIN" || role === "MANAGER") return "/admin/dashboard";
    if (role === "STAFF") return "/staff/dashboard";
    return "/profile";
  };

  const isAdmin = user?.role === "ADMIN" || user?.role === "MANAGER";

  const handleLogout = async () => {
    try {
      await AuthService.logout();
      queryClient.clear();
      Cookies.remove("accessToken");
      localStorage.clear();
      window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
      window.location.href = "/login";
    }
  };

  return (
    <header className="bg-white dark:bg-gray-950 border-b dark:border-gray-800 sticky top-0 z-50 shadow-sm transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
        
        {/* Logo Section - Visible on all devices */}
        <LinkNext href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.jpeg"
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full object-cover border border-pink-100 dark:border-pink-900"
          />
          <span className="text-base md:text-lg font-bold text-pink-600 hidden sm:block">
            Mom & Baby Wear
          </span>
        </LinkNext>

        {/* Desktop & Tablet Navigation - Hidden on Mobile (< 1024px) */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 text-[14px] font-medium text-gray-600 dark:text-gray-300">
          <LinkNext href="/products" className="hover:text-pink-600 transition-colors">
            Products
          </LinkNext>

          <div className="relative group py-4">
            <button className="flex items-center gap-1 hover:text-pink-600 font-semibold">
              Categories <ChevronDown size={14} />
            </button>
            <div className="absolute top-full left-0 w-56 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 shadow-xl rounded-lg hidden group-hover:block animate-in fade-in slide-in-from-top-2">
              <div className="py-2">
                {categories.map((cat: any) => (
                  <LinkNext
                    key={cat.id}
                    href={`/categories/${cat.id}`}
                    className="block px-4 py-2 hover:bg-pink-50 dark:hover:bg-gray-800 hover:text-pink-600 dark:text-gray-200 border-b last:border-0 border-gray-50 dark:border-gray-800 text-sm"
                  >
                    {cat.name}
                  </LinkNext>
                ))}
              </div>
            </div>
          </div>
        </nav>

        {/* Actions & Icons Section */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-4">
          
          {/* Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleThemeToggle} 
            className="rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {currentTheme === "light" ? <Moon size={20} /> : <Sun size={20} className="text-yellow-500" />}
          </Button>

          {/* Wishlist - Hidden on very small mobile */}
          <LinkNext href="/wishlist" className="p-2 text-gray-600 dark:text-gray-400 hover:text-pink-600">
            <Heart size={22} />
          </LinkNext>

          {/* Cart */}
          <LinkNext href="/cart" className="p-2 text-gray-600 dark:text-gray-400 hover:text-pink-600">
            <ShoppingCart size={22} />
          </LinkNext>

          {/* User Section */}
          <div className="hidden md:flex items-center gap-2 border-l dark:border-gray-800 pl-4">
            {isLoading ? (
              <div className="h-8 w-8 bg-gray-100 dark:bg-gray-800 rounded-full animate-pulse"></div>
            ) : user ? (
              <>
                <LinkNext href={getDashboardLink()} className="text-sm font-semibold text-gray-700 dark:text-gray-200 hover:text-pink-600">
                  {isAdmin ? "Dashboard" : "Profile"}
                </LinkNext>
                <div className="relative w-8 h-8 rounded-full overflow-hidden border border-pink-200">
                  <Image src={user.profileImage || "https://www.shutterstock.com/image-photo/indian-baby-girl-sitting-on-600nw-2168016381.jpg"} alt="User" fill className="object-cover" />
                </div>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={handleLogout}>
                  <LogOut size={18} />
                </Button>
              </>
            ) : (
              <LinkNext href="/login">
                <Button className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-5 text-sm font-bold">Login</Button>
              </LinkNext>
            )}
          </div>

          {/* Mobile Menu Button - Visible below lg */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-400 border dark:border-gray-800 rounded-md"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar - Enhanced for Dark Mode & Small Screens */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white dark:bg-gray-950 z-50 border-t dark:border-gray-800 p-5 animate-in slide-in-from-right w-full">
          <div className="space-y-3">
            <LinkNext onClick={() => setOpen(false)} href="/products" className="block p-4 bg-gray-50 dark:bg-gray-900 dark:text-gray-200 rounded-xl font-semibold">
              Products
            </LinkNext>

            {/* Mobile Categories Accordion/List */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
               <p className="text-xs font-bold text-gray-400 mb-2 uppercase">Categories</p>
               <div className="grid grid-cols-2 gap-2">
                 {categories.slice(0, 6).map((cat: any) => (
                   <LinkNext key={cat.id} onClick={() => setOpen(false)} href={`/categories/${cat.id}`} className="text-sm text-gray-600 dark:text-gray-300 py-1">
                     {cat.name}
                   </LinkNext>
                 ))}
               </div>
            </div>

            {user ? (
              <>
                <LinkNext onClick={() => setOpen(false)} href={getDashboardLink()} className="block p-4 bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400 rounded-xl font-bold flex items-center gap-2">
                  <LayoutDashboard size={18} /> {isAdmin ? "Admin Dashboard" : "My Profile"}
                </LinkNext>
                <button onClick={handleLogout} className="w-full text-center py-4 text-red-500 font-bold border border-red-100 dark:border-red-900/30 rounded-xl bg-red-50 dark:bg-red-950/20">
                  Sign Out
                </button>
              </>
            ) : (
              <LinkNext onClick={() => setOpen(false)} href="/login" className="block text-center bg-pink-600 text-white py-4 rounded-xl font-bold">
                Login / Register
              </LinkNext>
            )}
          </div>
        </div>
      )}
    </header>
  );
}