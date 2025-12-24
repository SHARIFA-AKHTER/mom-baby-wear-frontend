
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



"use client";

import Link from "next/link";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/app/providers/AuthProvider";


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: user } = useAuthContext();

  const links = (
    <>
      <Link href="/products" className="hover:text-pink-600">Products</Link>
      <Link href="/cart" className="hover:text-pink-600">Cart</Link>
      <Link href="/wishlist" className="hover:text-pink-600">Wishlist</Link>
      <Link href="/orders" className="hover:text-pink-600">Orders</Link>
      {user && (
        <Link href="/profile" className="hover:text-pink-600">
          Profile
        </Link>
      )}
    </>
  );

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-pink-600">
          Mom & Baby Wear
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
              Admin
            </Link>
          )}
          {user?.role === "STAFF" && (
            <Link
              href="/staff/stock"
              className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
            >
              Staff
            </Link>
          )}

          {/* Auth */}
          {!user ? (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          ) : (
            <Button
              variant="ghost"
              onClick={() => {
                document.cookie = "accessToken=; path=/; max-age=0";
                location.reload();
              }}
            >
              Logout
            </Button>
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
              Admin
            </Link>
          )}
          {user?.role === "STAFF" && (
            <Link href="/staff/stock" className="text-pink-600 font-medium">
              Staff
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
