

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/app/utils/axiosInstance";
import { Package, Calendar, User, Tag, ChevronRight, X, CheckCircle, Truck } from "lucide-react";

export default function StaffOrdersPage() {
  const queryClient = useQueryClient();
  const [selectedOrder, setSelectedOrder] = useState<any>(null); 

  const { data: orders, isLoading } = useQuery({
    queryKey: ["all-orders"],
    queryFn: async () => {
      const res = await axiosInstance.get("/order");
      return res.data.data;
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return await axiosInstance.patch(`/order/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["all-orders"] });
      setSelectedOrder(null); 
      alert("Order status updated!");
    },
  });

  if (isLoading) return <div className="p-10 text-center animate-pulse text-pink-600">Loading Orders...</div>;

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "DELIVERED": return "bg-green-100 text-green-700 border-green-200";
      case "PENDING": return "bg-amber-100 text-amber-700 border-amber-200";
      case "SHIPPED": return "bg-blue-100 text-blue-700 border-blue-200";
      default: return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen relative">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="text-pink-500" />
            Staff Order Panel
          </h1>
          <p className="text-sm text-gray-500">View details and update delivery status</p>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid gap-4">
        {orders?.map((order: any) => (
          <div key={order.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row justify-between gap-6">
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
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5"><User size={14} /> {order.user?.name}</div>
                    <div className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between lg:justify-end gap-8 border-t lg:border-t-0 pt-4 lg:pt-0">
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
                  <p className="text-xl font-black text-gray-900">৳{order.total}</p>
                </div>
               
                <button 
                  onClick={() => setSelectedOrder(order)}
                  className="bg-gray-900 text-white px-5 py-2.5 rounded-xl hover:bg-pink-600 transition-colors flex items-center gap-2 text-sm font-bold shadow-lg"
                >
                  Manage <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- Order Management Modal --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            {/* Modal Header */}
            <div className="p-6 border-b flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-xl text-gray-800">Manage Order</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              <div className="bg-pink-50 p-4 rounded-2xl flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-pink-400 uppercase">Order ID</p>
                  <p className="font-mono font-bold text-pink-700">{selectedOrder.id}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-pink-400 uppercase">Current Status</p>
                  <span className={`text-xs font-bold px-2 py-1 rounded-md border ${getStatusStyle(selectedOrder.status)}`}>
                    {selectedOrder.status}
                  </span>
                </div>
              </div>

              {/* Status Update Actions */}
              <div>
                <p className="text-sm font-bold text-gray-700 mb-3">Update Status To:</p>
                <div className="grid grid-cols-2 gap-3">
                  <button 
                    disabled={selectedOrder.status === "SHIPPED"}
                    onClick={() => updateStatusMutation.mutate({ id: selectedOrder.id, status: "SHIPPED" })}
                    className="flex items-center justify-center gap-2 p-3 border-2 border-blue-100 rounded-xl text-blue-600 font-bold hover:bg-blue-50 transition-all disabled:opacity-50"
                  >
                    <Truck size={18} /> Shipped
                  </button>
                  <button 
                    disabled={selectedOrder.status === "DELIVERED"}
                    onClick={() => updateStatusMutation.mutate({ id: selectedOrder.id, status: "DELIVERED" })}
                    className="flex items-center justify-center gap-2 p-3 border-2 border-green-100 rounded-xl text-green-600 font-bold hover:bg-green-50 transition-all disabled:opacity-50"
                  >
                    <CheckCircle size={18} /> Delivered
                  </button>
                </div>
              </div>

              {/* Customer Quick Info */}
              <div className="border-t pt-4">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Customer Details</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                    {selectedOrder.user?.name?.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{selectedOrder.user?.name}</p>
                    <p className="text-xs text-gray-500">{selectedOrder.user?.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-gray-50 text-center">
              <button 
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500 text-sm font-semibold hover:text-gray-800"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}