/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { 
  ChevronDown, ShoppingCart, Heart, LayoutDashboard, 
  LogOut, Package, List 
} from "lucide-react";
import { AuthService } from "@/app/services/auth.service";
import { useQueryClient } from "@tanstack/react-query";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  
  // React Query Client clear করার জন্য
  const queryClient = useQueryClient();
  const { data: user, isLoading } = useAuthContext();

  // ১. ক্যাটাগরি ফেচ করা
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const res = await fetch(`${API_URL}/category`);
        const json = await res.json();
        if (json.success) {
          setCategories(json.data);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // ২. রোল অনুযায়ী ড্যাশবোর্ড লিংক জেনারেটর
  const getDashboardLink = () => {
    if (!user) return "/login";
    const role = user.role?.toUpperCase();
    if (role === "ADMIN") return "/admin/dashboard";
    if (role === "STAFF") return "/staff/stock";
    return "/"; // সাধারণ ইউজারের জন্য (যেহেতু আপনার স্ট্রাকচারে /dashboard নেই)
  };

  // ৩. লগআউট হ্যান্ডেলার
  const handleLogout = async () => {
    try {
      await AuthService.logout(); 
      // মেমোরি থেকে ইউজার ডাটা ক্লিয়ার করা
      queryClient.clear(); 
      localStorage.clear();
      // হার্ড রিফ্রেশ করে লগইন পেজে পাঠানো
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Logout failed", error);
      window.location.href = "/login";
    }
  };

  const navLinks = [
    { name: "Products", href: "/products", icon: <Package size={18} /> },
    { name: "Cart", href: "/cart", icon: <ShoppingCart size={18} /> },
    { name: "Wishlist", href: "/wishlist", icon: <Heart size={18} /> },
    { name: "Orders", href: "/orders", icon: <List size={18} /> },
    { name: "Dashboard", href: "/admin/dashboard", icon: <List size={18} /> },
  ];

  return (
    <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.jpeg" 
            alt="Logo"
            width={35}
            height={35}
            className="rounded-full border border-pink-100"
          />
          <span className="text-xl font-bold text-pink-600 hidden sm:inline-block">
            Mom & Baby Wear
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-700">
          
          <div className="relative group px-2 py-4">
            <button className="flex items-center gap-1 hover:text-pink-600 transition-colors">
              Categories <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute top-full left-0 w-56 bg-white border border-gray-100 shadow-xl rounded-b-xl hidden group-hover:block">
              <div className="py-2">
                {categories.map((cat: any) => (
                  <Link 
                    key={cat.id} 
                    href={`/categories/${cat.id}`}
                    className="block px-4 py-2.5 hover:bg-pink-50 hover:text-pink-600 border-b last:border-0 border-gray-50"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-pink-600 transition-colors">
              {link.name}
            </Link>
          ))}

          {/* Auth Conditional Rendering */}
          {isLoading ? (
            <div className="h-8 w-20 bg-gray-100 animate-pulse rounded-full"></div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <Link 
                href={getDashboardLink()}
                className="flex items-center gap-1.5 bg-pink-600 text-white px-4 py-2 rounded-full hover:bg-pink-700 transition-all text-xs font-bold"
              >
                <LayoutDashboard size={14} /> Dashboard
              </Link>
              <Button
                variant="ghost"
                className="text-gray-500 hover:text-red-600 hover:bg-red-50 flex items-center gap-1"
                onClick={handleLogout}
              >
                <LogOut size={16} /> Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="border-pink-600 text-pink-600 hover:bg-pink-50 rounded-full px-6 h-9 font-bold">
                Login
              </Button>
            </Link>
          )}
        </nav>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)} className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-md">
          {open ? <span className="text-xl">✕</span> : <span className="text-xl">☰</span>}
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-16 bg-white z-60 overflow-y-auto border-t p-4 space-y-6">
          <div className="grid grid-cols-2 gap-3">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href} 
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg text-sm font-medium"
              >
                {link.icon} {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t">
            {user ? (
              <div className="space-y-3">
                <Link 
                  href={getDashboardLink()}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 bg-pink-600 text-white w-full py-3 rounded-xl font-bold"
                >
                  <LayoutDashboard size={18} /> Go to Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full py-3 text-red-500 font-bold border border-red-100 rounded-xl bg-red-50/50"
                >
                  <LogOut size={18} /> Sign Out
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-pink-600 text-white py-4 rounded-xl font-bold"
              >
                Login to Account
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}