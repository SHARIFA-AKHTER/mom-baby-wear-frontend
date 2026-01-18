/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Loader2,
  Package,
  ShoppingCart,
  Users,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import Pagination from "@/components/ui/Pagination";
import axiosInstance from "@/app/utils/axiosInstance";
import { ProductService } from "@/app/services/product.service";
import { useRouter } from "next/navigation";
import { SalesChart } from "@/app/components/common/SalesChart";
export default function AdminDashboardPage() {
  // --- States ---
  const [statsData, setStatsData] = useState<any>(null);
  const [products, setProducts] = useState([]);
  const [lowStock, setLowStock] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 5, total: 0 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  // --- Data Fetching ---
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, lowStockRes, productsRes] = await Promise.all([
        axiosInstance.get("/dashboard/stats"),
        axiosInstance.get("/dashboard/low-stock"),
        axiosInstance.get("/product", {
          params: { page, limit: 5, searchTerm },
        }),
      ]);

      setStatsData(statsRes.data?.data);
      setLowStock(lowStockRes.data?.data || []);
      setProducts(productsRes.data?.data?.result || []);
      setMeta(productsRes.data?.data?.meta || { page: 1, limit: 5, total: 0 });
    } catch (error) {
      console.error("Dashboard Loading Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [page, searchTerm]);

  // --- Handlers ---
  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await ProductService.delete(id);
        fetchDashboardData();
      } catch (error) {
        console.error("Delete Error:", error);
      }
    }
  };

  // --- Config ---
  const stats = [
    {
      label: "Total Products",
      value: statsData?.totalProducts || 0,
      icon: <Package size={24} />,
      color: "bg-purple-100 dark:bg-purple-900/20 text-purple-600",
    },
    {
      label: "Total Orders",
      value: statsData?.totalOrders || 0,
      icon: <ShoppingCart size={24} />,
      color: "bg-cyan-100 dark:bg-cyan-900/20 text-cyan-600",
    },
    {
      label: "Total Users",
      value: statsData?.totalUsers || 0,
      icon: <Users size={24} />,
      color: "bg-orange-100 dark:bg-orange-900/20 text-orange-600",
    },
    {
      label: "Revenue",
      value: `৳${statsData?.totalRevenue || 0}`,
      icon: <TrendingUp size={24} />,
      color: "bg-green-100 dark:bg-green-900/20 text-green-600",
    },
  ];

  return (
    <div className="space-y-8 p-4 md:p-6 bg-gray-50/50 dark:bg-gray-950 min-h-screen transition-colors duration-300 font-sans">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Manage your services and inventory
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/products/add")}
          className="w-full sm:w-auto bg-[#6C5DD3] text-white px-6 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#5a4cb3] transition-all shadow-lg shadow-purple-200 dark:shadow-none"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {/* 2. Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading && !statsData
          ? [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-32 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-[24px]"
              ></div>
            ))
          : stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 p-6 rounded-[24px] shadow-sm border border-transparent dark:border-gray-800 flex items-center gap-4 group hover:border-purple-400 transition-all cursor-default"
              >
                <div
                  className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110`}
                >
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-black text-gray-800 dark:text-white leading-tight">
                    {stat.value}
                  </h3>
                  <p className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mt-1">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
      </div>
            <div className="grid grid-cols-1 gap-6">
        <SalesChart />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Inventory Management (Left Side) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
              <Package className="text-[#6C5DD3]" size={22} /> Recent Inventory
            </h2>
            <div className="relative w-full sm:w-64">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={16}
              />
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Quick search..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 dark:text-white rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all"
              />
            </div>
          </div>

          <div className="bg-white dark:bg-gray-900 rounded-[32px] shadow-sm border border-gray-50 dark:border-gray-800/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 dark:bg-gray-800/30 text-gray-400 text-[11px] font-black uppercase tracking-[2px]">
                    <th className="px-6 py-5">Product Details</th>
                    <th className="px-6 py-5">Price</th>
                    <th className="px-6 py-5">Stock Status</th>
                    <th className="px-6 py-5 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="py-24 text-center">
                        <Loader2
                          className="animate-spin inline-block text-[#6C5DD3]"
                          size={30}
                        />
                      </td>
                    </tr>
                  ) : products.length === 0 ? (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-20 text-center text-gray-400 font-medium"
                      >
                        No products found.
                      </td>
                    </tr>
                  ) : (
                    products.map((product: any) => (
                      <tr
                        key={product.id}
                        className="hover:bg-gray-50/30 dark:hover:bg-gray-800/20 transition-all duration-200 group"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <img
                              src={
                                product.images?.[0] ||
                                "https://via.placeholder.com/150"
                              }
                              alt=""
                              className="w-12 h-12 rounded-xl object-cover border border-gray-100 dark:border-gray-700 group-hover:scale-110 transition-transform"
                            />
                            <div className="max-w-45">
                              <p className="font-bold text-gray-800 dark:text-gray-200 truncate">
                                {product.title}
                              </p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tight">
                                {product.sku || "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-black text-[#6C5DD3] text-lg">
                            ৳{product.price}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <span
                              className={`w-fit px-2 py-1 rounded-md text-[10px] font-black ${(product.stock || 0) < 10 ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"}`}
                            >
                              {product.stock || 0} LEFT
                            </span>
                            <div className="w-20 h-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                              <div
                                className={`h-full rounded-full ${(product.stock || 0) < 10 ? "bg-red-500" : "bg-green-500"}`}
                                style={{
                                  width: `${Math.min(((product.stock || 0) / 50) * 100, 100)}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg">
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id)}
                              className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-center py-4">
            <Pagination
              currentPage={page}
              totalPages={Math.ceil(meta.total / meta.limit) || 1}
              onPageChange={setPage}
            />
          </div>
        </div>

        {/* 4. Low Stock Section (Right Side) */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <AlertTriangle className="text-orange-500" size={20} /> Low Stock
            Alerts
          </h2>
          <div className="bg-white dark:bg-gray-900 p-6 rounded-[32px] border border-gray-50 dark:border-gray-800/50 space-y-4">
            {lowStock.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-10">
                Stock is healthy! ✨
              </p>
            ) : (
              lowStock.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-gray-50/50 dark:bg-gray-800/40 rounded-2xl border border-transparent hover:border-orange-200 transition-all"
                >
                  <img
                    src={item.images?.[0]}
                    className="w-10 h-10 rounded-lg object-cover"
                    alt=""
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 truncate">
                      {item.title}
                    </p>
                    <p className="text-red-500 font-black text-[10px]">
                      {item.stock} UNITS LEFT
                    </p>
                  </div>
                </div>
              ))
            )}
            <button
              onClick={() => router.push("/admin/inventory")}
              className="w-full py-3 mt-2 text-xs font-black text-[#6C5DD3] bg-purple-50 dark:bg-purple-900/20 rounded-xl hover:bg-[#6C5DD3] hover:text-white transition-all uppercase tracking-widest"
            >
              Full Inventory Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
