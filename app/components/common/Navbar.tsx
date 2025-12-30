
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/app/providers/AuthProvider";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: user} = useAuthContext();

  // Nav links
  const links = (
    <>
      <Link href="/products" className="hover:text-pink-600">
        Products
      </Link>
      <Link href="/cart" className="hover:text-pink-600">
        Cart
      </Link>
      <Link href="/wishlist" className="hover:text-pink-600">
        Wishlist
      </Link>
      <Link href="/orders" className="hover:text-pink-600">
        Orders
      </Link>
      <Link 
      href="/admin/dashboard" className="hover:text-pink-600">
        Dashboard
        </Link>
    </>
  );

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.jpeg" 
            alt="Logo"
            width={32}
            height={32}
            className="rounded-full"
          />
          <span className="text-2xl font-bold text-pink-600">
            Mom & Baby Wear
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
          {links}

          {/* Admin / Staff Panel */}
          {user?.role === "ADMIN" && (
            <Link
              href="/admin/dashboard"
              className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
            >
              Admin Panel
            </Link>
          )}
          {user?.role === "STAFF" && (
            <Link
              href="/staff/stock"
              className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
            >
              Staff Panel
            </Link>
          )}

          {/* Auth / Profile */}
          {!user ? (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              {user.profileImage && (
                <Image
                  src={user.profileImage}
                  alt={user.name || "User"}
                  width={32}
                  height={32}
                  className="rounded-full border"
                />
              )}
              <Button
                variant="ghost"
                onClick={() => {
                  document.cookie = "accessToken=; path=/; max-age=0";
                  location.reload();
                }}
              >
                Logout
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-2xl"
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-4 py-4 text-sm border-t bg-white">
          {links}

          {user?.role === "ADMIN" && (
            <Link href="/admin/dashboard" className="text-pink-600 font-medium">
              Admin Panel
            </Link>
          )}
          {user?.role === "STAFF" && (
            <Link href="/staff/stock" className="text-pink-600 font-medium">
              Staff Panel
            </Link>
          )}

          {!user ? (
            <Link href="/login" className="text-pink-600 font-semibold">
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                document.cookie = "accessToken=; path=/; max-age=0";
                location.reload();
              }}
              className="text-pink-600 font-semibold text-left"
            >
              Logout
            </button>
          )}
        </nav>
      )}
    </header>
  );
}


// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import { useAuthContext } from "@/app/providers/AuthProvider";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { data: user } = useAuthContext();

//   // Nav links (Orders সরিয়ে দেওয়া হয়েছে)
//   const links = (
//     <>
//       <Link href="/products" className="hover:text-pink-600 transition">
//         Products
//       </Link>
//       <Link href="/cart" className="hover:text-pink-600 transition">
//         Cart
//       </Link>
//       <Link href="/wishlist" className="hover:text-pink-600 transition">
//         Wishlist
//       </Link>
//     </>
//   );

//   return (
//     <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
//         {/* Logo Section */}
//         <Link href="/" className="flex items-center gap-2">
//           <Image
//             src="/logo.jpeg" 
//             alt="Logo"
//             width={32}
//             height={32}
//             className="rounded-full"
//           />
//           <span className="text-2xl font-bold text-pink-600">
//             Mom & Baby Wear
//           </span>
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
//           {links}

//           {/* Admin / Staff Panel (Role based conditional links) */}
//           {user?.role === "ADMIN" && (
//             <Link
//               href="/admin/dashboard"
//               className="bg-pink-600 text-white px-4 py-1.5 rounded-lg hover:bg-pink-700 transition"
//             >
//               Admin Panel
//             </Link>
//           )}
          
//           {user?.role === "STAFF" && (
//             <Link
//               href="/staff/stock"
//               className="bg-pink-600 text-white px-4 py-1.5 rounded-lg hover:bg-pink-700 transition"
//             >
//               Staff Panel
//             </Link>
//           )}

//           {/* Auth / Profile Section */}
//           {!user ? (
//             <Link href="/login">
//               <Button variant="outline" className="rounded-xl border-pink-200 text-pink-600 hover:bg-pink-50">
//                 Login
//               </Button>
//             </Link>
//           ) : (
//             <div className="flex items-center gap-3 ml-2 border-l pl-4">
//               {user.profileImage && (
//                 <Image
//                   src={user.profileImage}
//                   alt={user.name || "User"}
//                   width={32}
//                   height={32}
//                   className="rounded-full border border-pink-100"
//                 />
//               )}
//               <Button
//                 variant="ghost"
//                 className="text-gray-600 hover:text-red-500 hover:bg-red-50 transition"
//                 onClick={() => {
//                   document.cookie = "accessToken=; path=/; max-age=0";
//                   location.reload();
//                 }}
//               >
//                 Logout
//               </Button>
//             </div>
//           )}
//         </nav>

//         {/* Mobile Toggle Button */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden text-2xl text-gray-600"
//         >
//           {open ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile Nav Menu */}
//       {open && (
//         <nav className="md:hidden flex flex-col gap-4 px-4 py-6 text-base border-t bg-white animate-in slide-in-from-top duration-300">
//           {links}

//           <hr className="border-gray-100" />

//           {user?.role === "ADMIN" && (
//             <Link href="/admin/dashboard" className="text-pink-600 font-bold">
//               Admin Panel
//             </Link>
//           )}
//           {user?.role === "STAFF" && (
//             <Link href="/staff/stock" className="text-pink-600 font-bold">
//               Staff Panel
//             </Link>
//           )}

//           {!user ? (
//             <Link href="/login" className="text-pink-600 font-bold">
//               Login
//             </Link>
//           ) : (
//             <button
//               onClick={() => {
//                 document.cookie = "accessToken=; path=/; max-age=0";
//                 location.reload();
//               }}
//               className="text-red-500 font-bold text-left"
//             >
//               Logout
//             </button>
//           )}
//         </nav>
//       )}
//     </header>
//   );
// }

// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";
// import { Menu, X } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { useAuthContext } from "@/app/providers/AuthProvider";

// type Role = "ADMIN" | "STAFF" | "CUSTOMER" | "GUEST";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { data: user } = useAuthContext();

//   const role: Role = user?.role ?? "GUEST";

//   const linksByRole: Record<Role, { label: string; href: string }[]> = {
//     GUEST: [
//       { label: "Products", href: "/products" },
//       { label: "Categories", href: "/categories" },
//     ],
//     CUSTOMER: [
//       { label: "Products", href: "/products" },
//       { label: "Categories", href: "/categories" },
//       { label: "Cart", href: "/cart" },
//       { label: "Wishlist", href: "/wishlist" },
//       { label: "My Orders", href: "/orders" },
//     ],
//     ADMIN: [],
//     STAFF: [],
//   };

//   const navLinks = linksByRole[role] ?? [];

//   const logout = () => {
//     document.cookie = "accessToken=; path=/; max-age=0";
//     location.reload();
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <Image
//             src="/logo.jpeg"
//             alt="Mom & Baby Wear"
//             width={36}
//             height={36}
//             className="rounded-full"
//           />
//           <span className="text-lg sm:text-xl font-bold text-pink-600">
//             Mom & Baby Wear
//           </span>
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className="hover:text-pink-600 transition"
//             >
//               {link.label}
//             </Link>
//           ))}

//           {role === "ADMIN" && (
//             <Link
//               href="/admin/dashboard"
//               className="px-3 py-1 rounded bg-pink-600 text-white hover:bg-pink-700"
//             >
//               Admin Panel
//             </Link>
//           )}

//           {role === "STAFF" && (
//             <Link
//               href="/staff/orders"
//               className="px-3 py-1 rounded bg-pink-600 text-white hover:bg-pink-700"
//             >
//               Staff Panel
//             </Link>
//           )}

//           {!user ? (
//             <Link href="/login">
//               <Button variant="outline">Login</Button>
//             </Link>
//           ) : (
//             <div className="flex items-center gap-3">
//               {user.profileImage && (
//                 <Image
//                   src={user.profileImage}
//                   alt={user.name || "User"}
//                   width={32}
//                   height={32}
//                   className="rounded-full border"
//                 />
//               )}
//               <Button variant="ghost" onClick={logout}>
//                 Logout
//               </Button>
//             </div>
//           )}
//         </nav>

//         {/* Mobile Toggle */}
//         <button
//           className="md:hidden"
//           onClick={() => setOpen(!open)}
//         >
//           {open ? <X size={26} /> : <Menu size={26} />}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {open && (
//         <div className="md:hidden border-t bg-white px-4 py-4 space-y-4 text-sm">
//           {navLinks.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               onClick={() => setOpen(false)}
//               className="block font-medium text-gray-700 hover:text-pink-600"
//             >
//               {link.label}
//             </Link>
//           ))}

//           {role === "ADMIN" && (
//             <Link
//               href="/admin/dashboard"
//               className="block font-semibold text-pink-600"
//             >
//               Admin Panel
//             </Link>
//           )}

//           {role === "STAFF" && (
//             <Link
//               href="/staff/orders"
//               className="block font-semibold text-pink-600"
//             >
//               Staff Panel
//             </Link>
//           )}

//           {!user ? (
//             <Link href="/login" className="block font-semibold text-pink-600">
//               Login
//             </Link>
//           ) : (
//             <button
//               onClick={logout}
//               className="block font-semibold text-pink-600 text-left"
//             >
//               Logout
//             </button>
//           )}
//         </div>
//       )}
//     </header>
//   );
// }
