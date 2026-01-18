/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { OrderService } from "@/app/services/order.service";
import { Trash2, Package, Loader2, Calendar, User, Banknote, Search } from "lucide-react";

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

interface Order {
  id: string;
  total: number;
  status: OrderStatus;
  createdAt: string;
  user: {
    email: string;
  };
}

const statusStyles: Record<OrderStatus, string> = {
  PENDING: "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800",
  PROCESSING: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800",
  SHIPPED: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-800",
  DELIVERED: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800",
  CANCELLED: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800",
};

export default function AdminOrders() {
  const [ordersData, setOrdersData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    OrderService.getAll()
      .then((res: any) => {
        setOrdersData(res.data?.data || res.data || res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const ordersList: Order[] = Array.isArray(ordersData) 
    ? ordersData 
    : ordersData?.result || [];

  const filteredOrders = ordersList.filter(o => 
    o.user?.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      await OrderService.updateStatus(id, status);
      const updatedList = ordersList.map((o) => (o.id === id ? { ...o, status } : o));
      setOrdersData(Array.isArray(ordersData) ? updatedList : { ...ordersData, result: updatedList });
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await OrderService.delete(id);
      const filteredList = ordersList.filter((o) => o.id !== id);
      setOrdersData(Array.isArray(ordersData) ? filteredList : { ...ordersData, result: filteredList });
    } catch (error) {
      alert("Failed to delete order");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Loader2 className="animate-spin mb-4 text-[#6C5DD3]" size={40} />
        <p className="font-bold tracking-widest uppercase text-xs">Syncing Transactions...</p>
      </div>
    );
  }

  return (
    <div className="transition-colors duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
            Order <span className="text-[#6C5DD3]">Tracking</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">Manage customer payments and fulfillment</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search email or ID..." 
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6C5DD3] dark:text-gray-200"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-[#6C5DD3] text-white px-5 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-purple-200 dark:shadow-none whitespace-nowrap">
            TOTAL: {ordersList.length}
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
            <tr className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              <th className="p-6">Customer</th>
              <th className="p-6">Date</th>
              <th className="p-6 text-center">Amount</th>
              <th className="p-6 text-center">Status</th>
              <th className="p-6 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-900/5 transition-colors group">
                <td className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-400">
                      <User size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800 dark:text-gray-200 leading-none">{order.user?.email || 'Guest'}</p>
                      <p className="text-[10px] text-gray-400 mt-1 uppercase">ID: {order.id.slice(-6)}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-sm">
                    <Calendar size={14} />
                    {new Date(order.createdAt).toLocaleDateString("en-GB", { day: '2-digit', month: 'short', year: 'numeric' })}
                  </div>
                </td>
                <td className="p-6 text-center">
                  <span className="font-black text-gray-900 dark:text-white text-base">৳ {order.total.toLocaleString()}</span>
                </td>
                <td className="p-6 text-center">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                    className={`text-[10px] font-black px-4 py-2 rounded-xl border-2 outline-none cursor-pointer transition-all ${statusStyles[order.status]}`}
                  >
                    {Object.keys(statusStyles).map((status) => (
                      <option key={status} value={status} className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200">{status}</option>
                    ))}
                  </select>
                </td>
                <td className="p-6 text-right">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-2xl transition-all active:scale-90"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Grid */}
      <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-900 p-6 rounded-[2rem] border border-gray-50 dark:border-gray-800 shadow-sm relative overflow-hidden">
            <div className={`absolute top-0 right-0 px-4 py-1 rounded-bl-2xl text-[10px] font-black border-l border-b ${statusStyles[order.status]}`}>
              {order.status}
            </div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-[#6C5DD3]">
                <User size={24} />
              </div>
              <div className="max-w-37.5">
                <p className="text-xs text-gray-400 font-bold uppercase">Customer</p>
                <p className="font-black text-gray-800 dark:text-white truncate">{order.user?.email}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 dark:bg-gray-800/50 p-4 rounded-2xl">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Total Amount</p>
                <p className="text-lg font-black text-[#6C5DD3]">৳{order.total}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Placed On</p>
                <p className="text-sm font-bold dark:text-gray-200">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                className="flex-1 bg-gray-100 dark:bg-gray-800 border-none text-xs font-bold rounded-xl px-4 py-3 outline-none dark:text-white"
              >
                {Object.keys(statusStyles).map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              <button
                onClick={() => deleteOrder(order.id)}
                className="p-3 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl active:scale-95 transition-transform"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-gray-100 dark:border-gray-800">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="text-gray-300 dark:text-gray-600" size={40} />
          </div>
          <h3 className="text-gray-800 dark:text-gray-200 font-bold text-lg">No orders found</h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm">We couldn't find any transactions for your search.</p>
        </div>
      )}
    </div>
  );
}