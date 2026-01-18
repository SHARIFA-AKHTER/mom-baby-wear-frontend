/* eslint-disable @typescript-eslint/no-unused-vars */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { OrderService } from "@/app/services/order.service";
import { Loader2, ShoppingBag, Clock, CheckCircle, Truck, Inbox, Hash } from "lucide-react";
import { toast } from "sonner";

export default function StaffOrders() {
  const [ordersData, setOrdersData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await OrderService.getAll();

      setOrdersData(res?.data?.data || res?.data || res);
    } catch (error) {
      console.error("Failed to fetch orders", error);
      toast.error("Could not load orders");
    } finally {
      setLoading(false);
    }
  };


  const orders: any[] = Array.isArray(ordersData) 
    ? ordersData 
    : (ordersData?.result || ordersData?.orders || []);

  const updateStatus = async (id: string, status: string) => {
    try {
      setIsUpdating(id);
      await OrderService.updateStatus(id, status);
      toast.success(`Order status updated to ${status}`);
   

      const updateList = (prevList: any[]) => 
        prevList.map((o) => (o.id === id ? { ...o, status } : o));

      if (Array.isArray(ordersData)) {
        setOrdersData(updateList(ordersData));
      } else if (ordersData?.result) {
        setOrdersData({ ...ordersData, result: updateList(ordersData.result) });
      } else {
        fetchOrders(); 
      }
    } catch (error) {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(null);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-gray-50 dark:bg-[#0f111a] transition-colors">
      <Loader2 className="animate-spin mb-3 text-[#6C5DD3]" size={40} />
      <p className="text-gray-500 dark:text-gray-400 font-bold text-xs uppercase tracking-widest">Synchronizing Orders...</p>
    </div>
  );

  return (
    <div className="space-y-6 p-4 md:p-8 max-w-7xl mx-auto min-h-screen bg-gray-50 dark:bg-[#0f111a] transition-colors duration-300">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white flex items-center gap-3 tracking-tighter italic">
            <ShoppingBag className="text-[#6C5DD3]" size={36} /> ORDERS
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium uppercase tracking-tight">Delivery Management System</p>
        </div>
        <div className="bg-white dark:bg-[#1a1d2b] text-[#6C5DD3] px-6 py-3 rounded-2xl text-xs font-black border border-gray-100 dark:border-gray-800 shadow-sm flex items-center gap-2">
          LIVE FEED: <span className="text-gray-900 dark:text-white">{orders.length} ITEMS</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white dark:bg-[#1a1d2b] p-20 text-center rounded-[40px] border-2 border-dashed border-gray-100 dark:border-gray-800 text-gray-400">
          <Inbox size={64} className="mx-auto mb-4 opacity-10" />
          <p className="font-black uppercase tracking-widest text-xs">Database Empty</p>
        </div>
      ) : (
        <div className="grid gap-5">
          {orders.map((order) => (
            <div key={order.id} className="bg-white dark:bg-[#1a1d2b] p-5 md:p-8 rounded-[32px] shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col lg:flex-row justify-between gap-8 hover:border-[#6C5DD3] dark:hover:border-[#6C5DD3] transition-all group relative overflow-hidden">
              
              {/* Status Update Loading Overlay */}
              {isUpdating === order.id && (
                <div className="absolute inset-0 bg-white/60 dark:bg-black/60 z-10 flex items-center justify-center backdrop-blur-[2px]">
                   <Loader2 className="animate-spin text-[#6C5DD3]" size={32} />
                </div>
              )}

              <div className="flex gap-6 items-start">
                <div className="hidden sm:flex h-16 w-16 bg-gray-50 dark:bg-gray-800 rounded-3xl items-center justify-center text-gray-400 group-hover:bg-[#6C5DD3]/10 group-hover:text-[#6C5DD3] transition-colors shrink-0">
                  <Hash size={24} />
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-[2px] mb-1">Transaction Ref</p>
                    <p className="font-mono text-base font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                      #{order.id?.slice(-10).toUpperCase() || "N/A"}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-tight">
                      {order.user?.name || "Anonymous Customer"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1.5 font-medium italic">
                      <Inbox size={14} /> {order.user?.email || "No email available"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="flex flex-row lg:flex-col justify-between lg:justify-center items-center lg:items-end gap-2 border-y lg:border-y-0 lg:border-x border-gray-100 dark:border-gray-800 py-4 lg:py-0 lg:px-12">
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Settlement</p>
                <p className="text-3xl font-black text-[#6C5DD3] tracking-tighter">
                  ৳{order.total?.toLocaleString() || "0"}
                </p>
              </div>

              {/* Control Section */}
              <div className="flex flex-col justify-center gap-3 min-w-55">
                <div className="flex items-center gap-2 mb-1">
                   {order.status === 'PENDING' && <Clock size={16} className="text-amber-500" />}
                   {order.status === 'PROCESSING' && <Loader2 size={16} className="text-blue-500 animate-spin" />}
                   {order.status === 'SHIPPED' && <Truck size={16} className="text-purple-500" />}
                   {order.status === 'DELIVERED' && <CheckCircle size={16} className="text-green-500" />}
                   <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">Update Lifecycle</span>
                </div>

                <select
                  disabled={isUpdating === order.id}
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className={`w-full border-2 rounded-2xl px-4 py-3.5 text-xs font-black transition-all outline-none focus:ring-4 focus:ring-[#6C5DD3]/10 appearance-none cursor-pointer ${
                    order.status === 'DELIVERED' 
                    ? 'bg-green-50 dark:bg-green-900/20 border-green-100 dark:border-green-900/30 text-green-700 dark:text-green-400' 
                    : 'bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700 text-gray-800 dark:text-white focus:border-[#6C5DD3]'
                  }`}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
                <p className="text-[9px] text-gray-400 dark:text-gray-500 text-center font-bold tracking-tight">Last update: {new Date().toLocaleDateString()}</p>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}