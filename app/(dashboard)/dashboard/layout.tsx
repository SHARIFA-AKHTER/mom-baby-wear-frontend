// app/(dashboard)/dashboard/layout.tsx
import React, { ReactNode } from "react";
import Link from "next/link";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col">
        <div className="p-6 text-2xl font-bold border-b">Admin Panel</div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/dashboard/admin/dashboard" className="block px-4 py-2 rounded hover:bg-gray-200">
            Dashboard
          </Link>
          <Link href="/dashboard/admin/products" className="block px-4 py-2 rounded hover:bg-gray-200">
            Products
          </Link>
          <Link href="/dashboard/admin/orders" className="block px-4 py-2 rounded hover:bg-gray-200">
            Orders
          </Link>
          <Link href="/dashboard/admin/users" className="block px-4 py-2 rounded hover:bg-gray-200">
            Users
          </Link>
          <Link href="/dashboard/admin/coupons" className="block px-4 py-2 rounded hover:bg-gray-200">
            Coupons
          </Link>

          <div className="mt-6 font-semibold text-gray-500">Staff</div>
          <Link href="/dashboard/staff/stock" className="block px-4 py-2 rounded hover:bg-gray-200">
            Stock
          </Link>
          <Link href="/dashboard/staff/orders" className="block px-4 py-2 rounded hover:bg-gray-200">
            Staff Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
