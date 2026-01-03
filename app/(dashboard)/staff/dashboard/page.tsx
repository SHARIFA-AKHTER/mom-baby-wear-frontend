"use client";
import { useAuthContext } from "@/app/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { Package, Calendar, User, Tag, ChevronRight } from "lucide-react";

export default function StaffOrdersPage() {
  const { data: orders, isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/order"); 
      return res.data.data;
    },
  });

  if (isLoading) return <div className="p-10 text-center animate-pulse text-pink-600">Loading Orders...</div>;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "DELIVERED": return "bg-green-100 text-green-700 border-green-200";
      case "PENDING": return "bg-amber-100 text-amber-700 border-amber-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="text-pink-500" />
            Order Management
          </h1>
          <p className="text-sm text-gray-500">Manage and track all customer orders</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl shadow-sm border border-gray-100">
          <span className="text-gray-400 text-xs font-bold uppercase">Total Orders:</span>
          <span className="ml-2 text-lg font-bold text-pink-600">{orders?.length}</span>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {orders?.map((order: any) => (
          <div 
            key={order.id} 
            className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group"
          >
            <div className="flex flex-col lg:flex-row justify-between gap-6">
              
              {/* Order Basic Info */}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="h-16 w-16 bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 shrink-0">
                  <Package size={28} />
                </div>
                
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-bold text-gray-900">Order #{order.id.slice(0, 8).toUpperCase()}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${getStatusStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <User size={14} className="text-gray-400" />
                      <span className="font-medium text-gray-700">{order.user?.name}</span>
                      <span className="text-xs text-gray-400">({order.user?.email})</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-gray-400" />
                      {new Date(order.createdAt).toLocaleDateString("en-GB", {
                        day: 'numeric', month: 'short', year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Stats & Actions */}
              <div className="flex items-center justify-between lg:justify-end gap-8 border-t lg:border-t-0 pt-4 lg:pt-0">
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Amount</p>
                  <p className="text-xl font-black text-gray-900">৳{order.total}</p>
                </div>
                
                <button className="bg-gray-900 text-white p-3 rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg shadow-gray-200">
                  Manage
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>

            {/* Items Summary (Optional) */}
            <div className="mt-4 pt-4 border-t border-dashed border-gray-100 flex items-center gap-2">
              <Tag size={14} className="text-pink-400" />
              <p className="text-xs text-gray-500">
                Contains <span className="font-bold text-gray-700">{order.items?.length} items</span> — 
                Product IDs: {order.items?.map((i: any) => i.productId.slice(0,5)).join(", ")}...
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}