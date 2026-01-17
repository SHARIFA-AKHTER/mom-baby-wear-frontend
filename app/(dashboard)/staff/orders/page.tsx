/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { OrderService } from "@/app/services/order.service";
import { Loader2, Package, ShoppingBag, Clock, CheckCircle, Truck, Inbox } from "lucide-react";
import { toast } from "sonner";

export default function StaffOrders() {
  const [ordersData, setOrdersData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
    }
  };

  const orders: any[] = Array.isArray(ordersData) ? ordersData : ordersData?.result || [];

  const updateStatus = async (id: string, status: string) => {
    try {
      await OrderService.updateStatus(id, status);
      toast.success(`Order status updated to ${status}`);
   
      const updateList = (prevList: any[]) => 
        prevList.map((o) => (o.id === id ? { ...o, status } : o));

      if (Array.isArray(ordersData)) {
        setOrdersData(updateList(ordersData));
      } else {
        setOrdersData({ ...ordersData, result: updateList(ordersData.result) });
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-500">
      <Loader2 className="animate-spin mb-2" size={40} />
      <p>Loading orders...</p>
    </div>
  );

  return (
    <div className="space-y-6 p-4 md:p-6 max-w-7xl mx-auto font-sans">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-gray-900 flex items-center gap-3">
            <ShoppingBag className="text-[#6C5DD3]" size={32} /> Orders
          </h1>
          <p className="text-gray-500 text-sm">Manage customer orders and shipments</p>
        </div>
        <div className="bg-[#6C5DD3]/10 text-[#6C5DD3] px-4 py-2 rounded-xl text-sm font-bold border border-[#6C5DD3]/20">
          Recent Orders: {orders.length}
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white p-20 text-center rounded-[32px] border-2 border-dashed border-gray-100 text-gray-400">
          <Inbox size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-medium">No orders found.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-5 md:p-6 rounded-[24px] shadow-sm border border-gray-100 flex flex-col md:flex-row justify-between gap-6 hover:shadow-md transition-shadow">
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    <Package size={20} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Order ID</p>
                    <p className="font-mono text-sm font-bold text-gray-700">#{order.id.slice(-8).toUpperCase()}</p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm font-bold text-gray-800">{order.user?.name || "Customer"}</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <Inbox size={12} /> {order.user?.email}
                  </p>
                </div>
              </div>

              <div className="flex flex-row md:flex-col justify-between md:justify-center items-center md:items-start gap-2 border-y md:border-y-0 md:border-x border-gray-50 py-4 md:py-0 md:px-8">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider text-center md:text-left">Amount</p>
                <p className="text-xl font-black text-[#6C5DD3]">৳ {order.total?.toLocaleString()}</p>
              </div>

              <div className="flex flex-col justify-center gap-3 min-w-[180px]">
                <div className="flex items-center gap-2">
                   {order.status === 'PENDING' && <Clock size={16} className="text-amber-500" />}
                   {order.status === 'PROCESSING' && <Loader2 size={16} className="text-blue-500 animate-spin" />}
                   {order.status === 'SHIPPED' && <Truck size={16} className="text-purple-500" />}
                   {order.status === 'DELIVERED' && <CheckCircle size={16} className="text-green-500" />}
                   <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Update Status</span>
                </div>

                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className={`w-full border-2 rounded-xl px-3 py-2.5 text-xs font-bold transition-all outline-none focus:ring-2 focus:ring-[#6C5DD3]/20 ${
                    order.status === 'DELIVERED' 
                    ? 'bg-green-50 border-green-100 text-green-700' 
                    : 'bg-gray-50 border-gray-100 text-gray-700 focus:border-[#6C5DD3]'
                  }`}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}