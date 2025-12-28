
// "use client";

// import Link from "next/link";
// import { useState } from "react";

// export default function Navbar() {
//   const [open, setOpen] = useState(false);

//   const links = (
//     <>
//       <Link href="/products">Products</Link>
//       <Link href="/cart">Cart</Link>
//       <Link href="/wishlist">Wishlist</Link>
//       <Link href="/orders">Orders</Link>
//       <Link href="/profile">Profile</Link>
//       <Link href="/login" className="text-pink-600 font-semibold">
//         Login
//       </Link>
//     </>
//   );

//   return (
//     <header className="bg-white border-b sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-xl font-bold text-pink-600">
//           Mom & Baby Wear
//         </Link>

//         {/* Desktop */}
//         <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700">
//           {links}
//         </nav>

//         {/* Mobile toggle */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden text-xl"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile */}
//       {open && (
//         <nav className="md:hidden flex flex-col gap-4 px-4 py-4 text-sm border-t">
//           {links}
//         </nav>
//       )}
//     </header>
//   );
// }



// "use client";

// import Link from "next/link";
// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import { useAuthContext } from "@/app/providers/AuthProvider";


// export default function Navbar() {
//   const [open, setOpen] = useState(false);
//   const { data: user } = useAuthContext();
//   console.log("NAV USER:", user);

//   const links = (
//     <>
//       <Link href="/products" className="hover:text-pink-600">Products</Link>
//       <Link href="/cart" className="hover:text-pink-600">Cart</Link>
//       <Link href="/wishlist" className="hover:text-pink-600">Wishlist</Link>
//       <Link href="/orders" className="hover:text-pink-600">Orders</Link>
//       <Link href="/admin/dashboard" className="hover:text-pink-600">Dashboard</Link>
     
//       {user && (
//         <Link href="/profile" className="hover:text-pink-600">
//           Profile
//         </Link>
//       )}
//     </>
//   );

//   return (
//     <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="text-2xl font-bold text-pink-600">
//           Mom & Baby Wear
//         </Link>

//         {/* Desktop Nav */}
//         <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
//           {links}

//           {/* Admin / Staff Panel */}
//           {user?.role === "ADMIN" && (
//             <Link
//               href="/admin/dashboard"
//               className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
//             >
//               Admin Panel
//             </Link>
//           )}
//           {user?.role === "STAFF" && (
//             <Link
//               href="/staff/stock"
//               className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
//             >
//                Staff Panel
//             </Link>
//           )}

//           {/* Auth */}
//           {!user ? (
//             <Link href="/login">
//               <Button variant="outline">Login</Button>
//             </Link>
//           ) : (
//             <Button
//               variant="ghost"
//               onClick={() => {
//                 document.cookie = "accessToken=; path=/; max-age=0";
//                 location.reload();
//               }}
//             >
//               Logout
//             </Button>
//           )}
//         </nav>

//         {/* Mobile Toggle */}
//         <button
//           onClick={() => setOpen(!open)}
//           className="md:hidden text-2xl"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Nav */}
//       {open && (
//         <nav className="md:hidden flex flex-col gap-4 px-4 py-4 text-sm border-t bg-white">
//           {links}

//           {user?.role === "ADMIN" && (
//             <Link href="/admin/dashboard" className="text-pink-600 font-medium">
//                Admin Panel
//             </Link>
//           )}
//           {user?.role === "STAFF" && (
//             <Link href="/staff/stock" className="text-pink-600 font-medium">
//                Staff Panel
//             </Link>
//           )}

//           {!user ? (
//             <Link href="/login" className="text-pink-600 font-semibold">
//               Login
//             </Link>
//           ) : (
//             <button
//               onClick={() => {
//                 document.cookie = "accessToken=; path=/; max-age=0";
//                 location.reload();
//               }}
//               className="text-pink-600 font-semibold text-left"
//             >
//               Logout
//             </button>
//           )}
//         </nav>
//       )}
//     </header>
//   );
// }


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


//   const isAdmin = user?.role === "ADMIN";
//   const isStaff = user?.role === "STAFF";
//   const isManager = user?.role === "MANAGER";


//   const handleLogout = () => {
//     document.cookie = "accessToken=; path=/; max-age=0";
//     window.location.href = "/login";
//   };

//   return (
//     <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center text-white font-bold">M</div>
//           <span className="text-xl font-bold text-pink-600 hidden sm:block">
//             Mom & Baby Wear
//           </span>
//         </Link>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex gap-6 text-sm font-medium text-gray-700 items-center">
//           <Link href="/products" className="hover:text-pink-600 transition">Products</Link>
          
//        
//           {user && (
//             <>
//               <Link href="/cart" className="hover:text-pink-600 transition">Cart</Link>
//               <Link href="/wishlist" className="hover:text-pink-600 transition">Wishlist</Link>
//               <Link href="/orders" className="hover:text-pink-600 transition">Orders</Link>
//             </>
//           )}

//          
//           {(isAdmin || isStaff || isManager) && (
//             <Link 
//               href={isAdmin ? "/admin/dashboard" : "/staff/stock"} 
//               className="text-pink-600 font-bold border border-pink-200 px-3 py-1 rounded-md hover:bg-pink-50"
//             >
//               Dashboard
//             </Link>
//           )}

//           <div className="h-6 w-px bg-gray-200 mx-2" />

//           {/* Auth Section */}
//           {!user ? (
//             <Link href="/login">
//               <Button size="sm" className="bg-pink-600 hover:bg-pink-700">Login</Button>
//             </Link>
//           ) : (
//             <div className="flex items-center gap-3">
//               <div className="flex flex-col items-end">
//                 <span className="text-[10px] font-bold text-pink-600 leading-none uppercase">{user.role}</span>
//                 <span className="text-xs text-gray-500 truncate max-w-25">{user.email}</span>
//               </div>
              
//               {user.profileImage ? (
//                 <Image
//                   src={user.profileImage}
//                   alt="profile"
//                   width={32}
//                   height={32}
//                   className="rounded-full border border-pink-100"
//                 />
//               ) : (
//                 <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center border text-xs">
//                   {user.email?.charAt(0).toUpperCase()}
//                 </div>
//               )}
              
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={handleLogout}
//                 className="text-red-500 hover:text-red-700 hover:bg-red-50"
//               >
//                 Logout
//               </Button>
//             </div>
//           )}
//         </nav>

//         {/* Mobile Menu Button */}
//         <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-gray-600">
//           {open ? "✕" : "☰"}
//         </button>
//       </div>

//       {/* Mobile Navigation Menu */}
//       {open && (
//         <nav className="md:hidden flex flex-col gap-4 px-6 py-6 text-sm border-t bg-white shadow-inner animate-in fade-in duration-300">
//           <Link href="/products" onClick={() => setOpen(false)}>Products</Link>
          
//           {user && (
//             <>
//               <Link href="/cart" onClick={() => setOpen(false)}>Cart</Link>
//               <Link href="/wishlist" onClick={() => setOpen(false)}>Wishlist</Link>
//               <Link href="/orders" onClick={() => setOpen(false)}>Orders</Link>
//             </>
//           )}

//           {(isAdmin || isStaff || isManager) && (
//             <Link 
//               href={isAdmin ? "/admin/dashboard" : "/staff/stock"} 
//               className="text-pink-600 font-bold"
//               onClick={() => setOpen(false)}
//             >
//               Dashboard Panel
//             </Link>
//           )}

//           <hr />
          
//           {!user ? (
//             <Link href="/login" onClick={() => setOpen(false)} className="text-pink-600 font-bold">
//               Login
//             </Link>
//           ) : (
//             <button onClick={handleLogout} className="text-red-500 font-bold text-left">
//               Logout ({user.role})
//             </button>
//           )}
//         </nav>
//       )}
//     </header>
//   );
// }