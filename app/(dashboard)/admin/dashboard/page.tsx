/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */

// import React from "react";

// export default function AdminDashboardPage() {
//   const stats = [
//     { label: "Total Products", value: "120", icon: "📦", color: "bg-purple-100", text: "text-purple-600" },
//     { label: "Total Orders", value: "45", icon: "🛒", color: "bg-cyan-100", text: "text-cyan-600" },
//     { label: "Total Users", value: "78", icon: "👥", color: "bg-orange-100", text: "text-orange-600" },
//     { label: "Active Coupons", value: "12", icon: "🎟️", color: "bg-red-100", text: "text-red-600" },
//   ];

//   return (
//     <div className="space-y-8">
//       <h1 className="text-2xl font-bold text-gray-800">Welcome back, Admin!</h1>
      
//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <div key={index} className="bg-white p-6 rounded-[24px] shadow-sm flex items-center gap-4 border border-transparent hover:border-purple-200 transition-all">
//             <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center text-2xl`}>
//               {stat.icon}
//             </div>
//             <div>
//               <h3 className="text-2xl font-black text-gray-800">{stat.value}</h3>
//               <p className="text-gray-400 text-xs font-semibold uppercase">{stat.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 bg-white p-8 rounded-[32px] shadow-sm">
//           <h2 className="font-bold text-gray-800 mb-6">Weekly Sales Analysis</h2>
//           <div className="w-full h-48 flex items-end justify-around gap-2 bg-gray-50 rounded-2xl p-6">
//              <div className="w-8 bg-purple-200 h-1/2 rounded-t-lg"></div>
//              <div className="w-8 bg-[#6C5DD3] h-3/4 rounded-t-lg shadow-lg"></div>
//              <div className="w-8 bg-purple-200 h-2/3 rounded-t-lg"></div>
//              <div className="w-8 bg-[#6C5DD3] h-full rounded-t-lg shadow-lg"></div>
//              <div className="w-8 bg-purple-200 h-1/3 rounded-t-lg"></div>
//           </div>
//         </div>
        
//         <div className="bg-white p-8 rounded-[32px] shadow-sm flex flex-col items-center justify-center text-center">
//             <div className="relative w-32 h-32 flex items-center justify-center">
//                 <div className="absolute inset-0 border-12 border-gray-50 rounded-full"></div>
//                 <div className="absolute inset-0 border-12 border-[#6C5DD3] border-t-transparent border-l-transparent rounded-full rotate-45"></div>
//                 <span className="text-xl font-bold text-gray-800">75%</span>
//             </div>
//             <p className="mt-6 font-bold text-gray-700">Customer Satisfaction</p>
//             <p className="text-xs text-gray-400 mt-1">Based on recent 1k reviews</p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useEffect, useState } from "react";
import { Plus, Search, Edit2, Trash2, Loader2 } from "lucide-react";

import Pagination from "@/components/ui/Pagination";
import axiosInstance from "@/app/utils/axiosInstance";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState({ page: 1, limit: 10, total: 0 });
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get(`/product`, {
        params: {
          page,
          limit: 10,
          searchTerm,
        },
      });
      setProducts(res.data.data.result);
      setMeta(res.data.data.meta);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, searchTerm]);

  const totalPages = Math.ceil(meta.total / meta.limit);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Product Management</h1>
        <button className="bg-[#6C5DD3] text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-[#5a4cb3] transition-all">
          <Plus size={20} /> Add New Product
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#6C5DD3]/20"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] shadow-sm overflow-hidden border border-gray-50">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-gray-400">
                    <Loader2 className="animate-spin inline-block mr-2" /> Loading products...
                  </td>
                </tr>
              ) : (
                products.map((product: any) => (
                  <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-800">{product.name}</td>
                    <td className="px-6 py-4 text-gray-500">{product.category?.name || 'N/A'}</td>
                    <td className="px-6 py-4 font-bold text-[#6C5DD3]">${product.price}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-lg text-xs font-bold ${product.inventory?.quantity < 10 ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
                        {product.inventory?.quantity || 0} left
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={18} /></button>
                        <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination Integration */}
      <Pagination 
        currentPage={page} 
        totalPages={totalPages} 
        onPageChange={(newPage) => setPage(newPage)} 
      />
    </div>
  );
}