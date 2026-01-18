/* eslint-disable react-hooks/set-state-in-effect */

/* eslint-disable @next/next/no-img-element */
"use client";
import React, { ReactNode, useEffect, useState } from "react";
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
  Search,
  Settings,
  Sparkles,
  MessageSquare,
  Layers,
  Home,
  Bell,
  Moon,
  Sun,
  Menu,
  X,
} from "lucide-react";
import { initTheme, toggleTheme } from "@/app/utils/theme";
import { ProfileDropdown } from "./coupons/components/ProfileDropdown";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    const theme = initTheme();
    setCurrentTheme(theme);
  }, []);

  const handleThemeToggle = () => {
    const newTheme = toggleTheme();
    setCurrentTheme(newTheme);
  };

  const menuItems = [
    {
      group: "Main",
      items: [
        {
          name: "Dashboard",
          icon: <LayoutDashboard size={20} />,
          href: "/admin/dashboard",
        },
        {
          name: "Products",
          icon: <Package size={20} />,
          href: "/admin/products",
        },
        {
          name: "Categories",
          icon: <Layers size={20} />,
          href: "/admin/categories",
        },
        {
          name: "Orders",
          icon: <ShoppingCart size={20} />,
          href: "/admin/orders",
        },
      ],
    },
    {
      group: "Management",
      items: [
        { name: "Users", icon: <Users size={20} />, href: "/admin/users" },
        { name: "Coupons", icon: <Ticket size={20} />, href: "/admin/coupons" },
        {
          name: "Inventory",
          icon: <Database size={20} />,
          href: "/admin/inventory",
        },
        {
          name: "Settings",
          icon: <Settings size={20} />,
          href: "/admin/settings",
        },
      ],
    },
    {
      group: "Engagement",
      items: [
        { name: "Reviews", icon: <Star size={20} />, href: "/admin/reviews" },
        { name: "Staff Order", icon: <Package size={20} />, href: "/staff/orders" },
        {
          name: "Messages",
          icon: <MessageSquare size={20} />,
          href: "/admin/messages",
        },
        {
          name: "newsletter",
          icon: <MessageSquare size={20} />,
          href: "/admin/newsletter",
        },
        {
          name: "AI Tools",
          icon: <Sparkles size={20} />,
          href: "/admin/ai-tools",
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-[#FDFCFB] dark:bg-gray-950 transition-colors duration-300 overflow-hidden">
      {/* --- Sidebar --- */}
      <aside
        className={`
        ${isSidebarOpen ? "w-72" : "w-0 -ml-72 md:w-20 md:ml-0"} 
        fixed md:relative z-50 h-full bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 transition-all duration-300 flex flex-col shrink-0
      `}
      >
        {/* Logo Section */}
        <div className="p-6 mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-tr from-[#6C5DD3] to-[#8E84E5] rounded-2xl flex items-center justify-center text-white shadow-xl shadow-purple-200 dark:shadow-none transition-transform duration-300 hover:rotate-6">
              <Layers size={22} strokeWidth={2.5} />
            </div>

            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-tighter text-gray-800 dark:text-white leading-none">
                  ADMIN<span className="text-[#6C5DD3]">CORE</span>
                </span>
                <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 tracking-[3px] uppercase">
                  Management
                </span>
              </div>
            )}
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-500 hover:text-red-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto no-scrollbar pb-10">
          {menuItems.map((group, i) => (
            <div key={i} className="space-y-1.5">
              {isSidebarOpen && (
                <p className="px-4 text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[2px] mb-2">
                  {group.group}
                </p>
              )}
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`
                      flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group relative
                      ${
                        isActive
                          ? "bg-[#6C5DD3] text-white shadow-xl shadow-purple-100 dark:shadow-none font-bold"
                          : "text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-[#6C5DD3] dark:hover:text-purple-400"
                      }
                    `}
                  >
                    <span
                      className={`${isActive ? "scale-110" : "group-hover:scale-110"} transition-transform`}
                    >
                      {item.icon}
                    </span>
                    {isSidebarOpen && (
                      <span className="text-sm">{item.name}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}

          {/* Bottom Links */}
          <div className="pt-6 border-t border-gray-100 dark:border-gray-800 space-y-1">
            <Link
              href="/"
              className="flex items-center gap-4 px-4 py-3 text-gray-400 hover:text-[#6C5DD3] dark:hover:text-purple-400 transition-all"
            >
              <Home size={20} />{" "}
              {isSidebarOpen && (
                <span className="text-sm font-medium">Back to Shop</span>
              )}
            </Link>
          </div>
        </nav>
      </aside>

      {/* --- Main Content --- */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 flex items-center justify-between px-6 md:px-10 bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl border-b border-gray-100 dark:border-gray-800 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!isSidebarOpen)}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors text-gray-600 dark:text-gray-400"
            >
              <Menu size={22} />
            </button>
            <div className="hidden lg:flex items-center gap-3 text-gray-400 bg-gray-50 dark:bg-gray-800 px-5 py-2.5 rounded-2xl w-80 text-sm border border-transparent focus-within:border-purple-200 transition-all">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search analytics..."
                className="bg-transparent outline-none w-full dark:text-gray-200"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            {/* Theme Toggle Button using your toggleTheme util */}
            <button
              onClick={handleThemeToggle}
              className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-all"
              title={`Switch to ${currentTheme === "dark" ? "Light" : "Dark"} Mode`}
            >
              {currentTheme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <button className="p-2.5 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></span>
            </button>

            <div className="h-8 w-px bg-gray-100 dark:bg-gray-800 mx-1 hidden sm:block"></div>

            <div className="flex items-center gap-3 pl-2 group cursor-pointer">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-black text-gray-800 dark:text-gray-100 leading-none mb-1">
                  Sharifa
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                  Super Admin
                </p>
              </div>
              {/* <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                className="w-10 h-10 rounded-xl bg-[#6C5DD3]/10 border border-gray-100 dark:border-gray-700 shadow-sm object-cover transition-transform group-hover:scale-105"
                alt="avatar"
              /> */}
              <ProfileDropdown />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-auto p-4 md:p-8 no-scrollbar scroll-smooth">
          <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
