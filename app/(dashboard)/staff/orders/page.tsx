/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useEffect, useState } from "react";
import { OrderService } from "@/app/services/order.service";

export default function StaffOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    OrderService.getAll().then(setOrders);
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await OrderService.updateStatus(id, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Orders</h1>

      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded shadow">
            <p><b>User:</b> {order.user.email}</p>
            <p><b>Total:</b> ৳ {order.total}</p>

            <select
              value={order.status}
              onChange={(e) =>
                updateStatus(order.id, e.target.value)
              }
              className="mt-2 border rounded px-2 py-1"
            >
              <option>PENDING</option>
              <option>PROCESSING</option>
              <option>SHIPPED</option>
              <option>DELIVERED</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
