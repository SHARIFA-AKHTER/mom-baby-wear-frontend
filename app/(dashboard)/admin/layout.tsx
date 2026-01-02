/* eslint-disable @next/next/no-img-element */
"use client";
import React, { ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Ticket, 
  Star, 
  Database,
  Search
} from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin/dashboard" },
    { name: "Products", icon: <Package size={20} />, href: "/admin/products" },
    { name: "Orders", icon: <ShoppingCart size={20} />, href: "/admin/orders" },
    { name: "Users", icon: <Users size={20} />, href: "/admin/users" },
    { name: "Coupons", icon: <Ticket size={20} />, href: "/admin/coupons" },
    { name: "Reviews", icon: <Star size={20} />, href: "/admin/reviews" },
    { name: "Inventory", icon: <Database size={20} />, href: "/admin/inventory" },
  ];

  return (
    <div className="flex h-screen bg-[#F9F5F0]">
      {/* --- Sidebar --- */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shrink-0">
        <div className="p-8 text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-[#6C5DD3] rounded-lg flex items-center justify-center text-white text-xs">H</div>
          <span>AdminPanel</span>
        </div>

        <nav className="flex-1 px-6 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                pathname === item.href 
                ? "bg-[#6C5DD3] text-white font-bold" 
                : "text-gray-400 hover:bg-gray-50 hover:text-[#6C5DD3]"
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
          
          <div className="pt-10 px-4 font-semibold text-gray-400 uppercase text-[10px] tracking-wider">Staff Section</div>
          <Link href="/staff/stock" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-600 transition-colors">
            <Database size={18} /> <span className="text-sm">Stock</span>
          </Link>
           <Link href="/staff/orders" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-600 cursor-pointer">
            <span>📋</span> Staff Orders
          </Link>
           <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-gray-600 cursor-pointer">
            <span>📋</span> Home
          </Link>
        </nav>
      </aside>

      {/* --- Main Section --- */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-10 bg-white/50 backdrop-blur-md border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3 text-gray-400 bg-white px-4 py-2 rounded-lg w-72 shadow-sm text-sm border border-gray-50">
            <Search size={16} />
            <input type="text" placeholder="Search anything..." className="bg-transparent outline-none w-full" />
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-bold text-gray-800">Sharifa</p>
              <p className="text-[10px] text-gray-400">Main Admin</p>
            </div>
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" 
              className="w-10 h-10 rounded-full bg-gray-200 border-2 border-white shadow-sm" 
              alt="avatar" 
            />
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-auto p-8">
          {children}
        </main>
      </div>
    </div>
  );
}