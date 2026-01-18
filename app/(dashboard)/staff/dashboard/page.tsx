
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { Package, Calendar, User, ChevronRight, X, CheckCircle, Truck, Loader2, Inbox } from "lucide-react";
import { toast } from "sonner";

export default function StaffOrdersPage() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);


  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/order");
    
      return res.data?.data?.result || res.data?.result || [];
    },
  });


  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {

      return await axiosInstance.patch(`/order/${id}/status`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
      setSelectedOrder(null);
      toast.success("Order status updated successfully!");
    },
    onError: () => {
      toast.error("Failed to update status. Check permissions.");
    }
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] dark:bg-[#0f111a]">
      <Loader2 className="animate-spin text-pink-500 mb-2" size={40} />
      <p className="text-gray-500 dark:text-gray-400 font-medium">Synchronizing Orders...</p>
    </div>
  );

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "DELIVERED": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800";
      case "PENDING": return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400 dark:border-amber-800";
      case "SHIPPED": return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800";
      case "PROCESSING": return "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800";
      default: return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50 dark:bg-[#0f111a] min-h-screen transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <Package className="text-pink-500" size={32} />
            STAFF PANEL
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Order management & logistics tracking</p>
        </div>
        <div className="bg-white dark:bg-[#1a1d2b] px-4 py-2 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Total Orders</p>
          <p className="text-xl font-black text-pink-500">{orders.length}</p>
        </div>
      </div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-[#1a1d2b] rounded-[32px] border-2 border-dashed border-gray-100 dark:border-gray-800">
           <Inbox className="mx-auto mb-4 text-gray-300" size={48} />
           <p className="text-gray-500 dark:text-gray-400 font-bold">No orders found in database</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order: any) => (
            <div key={order.id} className="bg-white dark:bg-[#1a1d2b] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-gray-800 hover:border-pink-500/50 transition-all group">
              <div className="flex flex-col lg:flex-row justify-between gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="h-16 w-16 bg-pink-50 dark:bg-pink-900/10 rounded-2xl flex items-center justify-center text-pink-500 shrink-0 group-hover:scale-105 transition-transform">
                    <Package size={28} />
                  </div>
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-bold text-gray-900 dark:text-white tracking-tight text-lg">
                        #{order.id.slice(-8).toUpperCase()}
                      </span>
                      <span className={`text-[10px] font-black px-2.5 py-0.5 rounded-full border uppercase tracking-widest ${getStatusStyle(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1.5 font-medium italic"><User size={14} /> {order.user?.name || 'Guest'}</div>
                      <div className="flex items-center gap-1.5 font-medium"><Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between lg:justify-end gap-8 border-t lg:border-t-0 pt-4 lg:pt-0 dark:border-gray-800">
                  <div className="text-left lg:text-right">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Settlement</p>
                    <p className="text-2xl font-black text-gray-900 dark:text-white">৳{order.total?.toLocaleString()}</p>
                  </div>
                 
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="bg-gray-900 dark:bg-pink-600 text-white px-6 py-3 rounded-xl hover:bg-pink-600 dark:hover:bg-pink-700 transition-all flex items-center gap-2 text-sm font-bold shadow-lg active:scale-95"
                  >
                    Manage <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* --- Order Management Modal --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all">
          <div className="bg-white dark:bg-[#1a1d2b] w-full max-w-lg rounded-[32px] shadow-2xl overflow-hidden animate-in zoom-in duration-200 border dark:border-gray-800">
            {/* Modal Header */}
            <div className="p-6 border-b dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-black/20">
              <h3 className="font-black text-xl text-gray-800 dark:text-white uppercase tracking-tight">Dispatch Control</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors text-gray-500">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="bg-pink-50 dark:bg-pink-900/10 p-5 rounded-2xl flex justify-between items-center border border-pink-100 dark:border-pink-900/20">
                <div>
                  <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-1">Tracking ID</p>
                  <p className="font-mono font-bold text-pink-700 dark:text-pink-400 break-all">{selectedOrder.id}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] font-black text-pink-400 uppercase tracking-widest mb-1">Status</p>
                  <span className={`text-[10px] font-black px-2 py-1 rounded-md border uppercase ${getStatusStyle(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Status Update Actions */}
              <div className="space-y-3">
                <p className="text-xs font-black text-gray-400 uppercase tracking-[2px]">Workflow Update</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    disabled={updateStatusMutation.isPending || selectedOrder.status === "SHIPPED"}
                    onClick={() => updateStatusMutation.mutate({ id: selectedOrder.id, status: "SHIPPED" })}
                    className="flex items-center justify-center gap-2 p-4 border-2 border-blue-100 dark:border-blue-900/30 rounded-2xl text-blue-600 dark:text-blue-400 font-black uppercase text-[10px] tracking-widest hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all disabled:opacity-30"
                  >
                    <Truck size={18} /> Shipped
                  </button>
                  <button 
                    disabled={updateStatusMutation.isPending || selectedOrder.status === "DELIVERED"}
                    onClick={() => updateStatusMutation.mutate({ id: selectedOrder.id, status: "DELIVERED" })}
                    className="flex items-center justify-center gap-2 p-4 border-2 border-green-100 dark:border-green-900/30 rounded-2xl text-green-600 dark:text-green-400 font-black uppercase text-[10px] tracking-widest hover:bg-green-50 dark:hover:bg-green-900/20 transition-all disabled:opacity-30"
                  >
                    <CheckCircle size={18} /> Delivered
                  </button>
                </div>
              </div>

              {/* Customer Quick Info */}
              <div className="border-t dark:border-gray-800 pt-6">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Customer Info</p>
                <div className="flex items-center gap-4 bg-gray-50 dark:bg-black/20 p-4 rounded-2xl border dark:border-gray-800">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center font-black text-white text-lg">
                    {selectedOrder.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="text-sm font-black text-gray-800 dark:text-white uppercase tracking-tight">{selectedOrder.user?.name || 'Unknown User'}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium italic">{selectedOrder.user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50/50 dark:bg-black/20 text-center border-t dark:border-gray-800">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-400 text-[10px] font-black uppercase tracking-widest hover:text-pink-500 transition-colors"
              >
                Dismiss Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}