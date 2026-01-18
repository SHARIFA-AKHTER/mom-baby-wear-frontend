"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { useAuth } from "@/app/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, LogOut, Package, LayoutDashboard, Loader2 } from "lucide-react";

export function ProfileDropdown() {
  const router = useRouter();
  const { data: user, isLoading } = useAuth();

  const handleLogout = () => {
    Cookies.remove("accessToken");
    window.location.href = "/login";
  };

  if (isLoading) {
    return <Loader2 className="h-8 w-8 animate-spin text-gray-400" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="relative outline-none group">
          <Avatar className="h-10 w-10 border-2 border-white dark:border-gray-800 shadow-sm transition-transform group-hover:scale-105">
            <AvatarImage
              src={
                user?.image ||
                "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              }
              alt={user?.name}
            />
            <AvatarFallback className="bg-[#6C5DD3] text-white font-black">
              {user?.name?.substring(0, 2).toUpperCase() || "AD"}
            </AvatarFallback>
          </Avatar>
          <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-900" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-64 mt-2 rounded-[1.5rem] p-2 shadow-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl"
        align="end"
      >
        <DropdownMenuLabel className="font-normal p-4">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-black uppercase tracking-tighter dark:text-white">
              {user?.name || "Admin User"}
            </p>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
              {user?.email || "admin@mom-and-baby.com"}
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator className="bg-gray-100 dark:bg-gray-800" />

        <DropdownMenuGroup className="p-1">
          <Link href="/admin/dashboard">
            <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 focus:bg-indigo-50 dark:focus:bg-indigo-900/20">
              <LayoutDashboard className="mr-3 h-4 w-4 text-[#6C5DD3]" />
              <span className="text-xs font-black uppercase tracking-tighter">
                Admin Panel
              </span>
            </DropdownMenuItem>
          </Link>

          <Link href="/admin/users">
            <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 focus:bg-indigo-50 dark:focus:bg-indigo-900/20">
              <User className="mr-3 h-4 w-4" />
              <span className="text-xs font-black uppercase tracking-tighter">
                Manage Users
              </span>
            </DropdownMenuItem>
          </Link>

          <Link href="/admin/products">
            <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 focus:bg-indigo-50 dark:focus:bg-indigo-900/20">
              <Package className="mr-3 h-4 w-4" />

              <span className="text-xs font-black uppercase tracking-tighter">
                Products
              </span>
            </DropdownMenuItem>
          </Link>

          <Link href="/admin/inventory">
            <DropdownMenuItem className="rounded-xl cursor-pointer py-2.5 focus:bg-indigo-50 dark:focus:bg-indigo-900/20">
              <Package className="mr-3 h-4 w-4" />

              <span className="text-xs font-black uppercase tracking-tighter">
                Inventory
              </span>
            </DropdownMenuItem>
          </Link>

          
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <div className="p-1">
          <DropdownMenuItem
            onClick={handleLogout}
            className="rounded-xl cursor-pointer py-2.5 text-red-500 focus:bg-red-50 dark:focus:bg-red-900/10 font-bold"
          >
            <LogOut className="mr-3 h-4 w-4" />
            <span className="text-xs font-black uppercase tracking-tighter">
              Log out
            </span>
            <DropdownMenuShortcut className="text-[10px] opacity-50">
              ⇧⌘Q
            </DropdownMenuShortcut>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
