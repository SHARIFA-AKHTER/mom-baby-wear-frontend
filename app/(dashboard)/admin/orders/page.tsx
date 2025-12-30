/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { OrderService } from "@/app/services/order.service";
import { Trash2, Clock, CheckCircle, Truck, Package, MoreHorizontal } from "lucide-react";

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
  PENDING: "bg-amber-100 text-amber-700 border-amber-200",
  PROCESSING: "bg-blue-100 text-blue-700 border-blue-200",
  SHIPPED: "bg-purple-100 text-purple-700 border-purple-200",
  DELIVERED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    OrderService.getAll().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const updateStatus = async (id: string, status: OrderStatus) => {
    try {
      await OrderService.updateStatus(id, status);
      setOrders((prev) =>
        prev.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteOrder = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await OrderService.delete(id);
      setOrders((prev) => prev.filter((o) => o.id !== id));
    } catch (error) {
      alert("Failed to delete order");
    }
  };

  if (loading) return <div className="p-10 text-center font-medium">Loading orders...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Order Management</h1>
          <p className="text-gray-500 mt-1">Manage and track all customer transactions</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg shadow-sm border text-sm font-medium text-gray-600">
          Total Orders: {orders.length}
        </div>
      </div>

      {/* Desktop Table View (Hidden on mobile) */}
      <div className="hidden lg:block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 font-semibold">
            <tr>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium text-gray-800">{order.user.email}</td>
                <td className="p-4 text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="p-4 font-bold text-gray-900">৳ {order.total.toLocaleString()}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                    className={`text-xs font-bold px-3 py-1.5 rounded-full border outline-none cursor-pointer transition-all ${statusStyles[order.status]}`}
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="PROCESSING">PROCESSING</option>
                    <option value="SHIPPED">SHIPPED</option>
                    <option value="DELIVERED">DELIVERED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete Order"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile & Tablet Card View (Hidden on desktop) */}
      <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div className="max-w-[70%]">
                <p className="text-xs text-gray-400 uppercase font-bold tracking-wider">Customer</p>
                <p className="font-bold text-gray-800 truncate">{order.user.email}</p>
              </div>
              <span className={`text-[10px] font-black px-2 py-1 rounded-md border ${statusStyles[order.status]}`}>
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Date</p>
                <p className="text-sm text-gray-600">{new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-bold uppercase">Total</p>
                <p className="text-sm font-black text-pink-600">৳ {order.total}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
              <select
                value={order.status}
                onChange={(e) => updateStatus(order.id, e.target.value as OrderStatus)}
                className="flex-1 bg-gray-50 border border-gray-200 text-sm rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-pink-500"
              >
                <option value="PENDING">Pending</option>
                <option value="PROCESSING">Processing</option>
                <option value="SHIPPED">Shipped</option>
                <option value="DELIVERED">Delivered</option>
                <option value="CANCELLED">Cancelled</option>
              </select>
              <button
                onClick={() => deleteOrder(order.id)}
                className="p-2.5 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {orders.length === 0 && (
        <div className="bg-white py-20 rounded-2xl border border-dashed border-gray-300 text-center">
          <Package className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-medium">No orders found</p>
        </div>
      )}
    </div>
  );
}