/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryService } from "@/app/services/inventory.service";
import { Loader2, AlertTriangle, Edit3, Package, Save, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminInventoryPage() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);

  // ডাটা ফেচ করা
  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-inventory"],
    queryFn: () => InventoryService.getAll(),
  });

  const inventoryData = data?.data || [];

  // স্টক আপডেট মিউটেশন
  const updateMutation = useMutation({
    mutationFn: ({ productId, quantity }: { productId: string; quantity: number }) =>
      InventoryService.updateStock(productId, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-inventory"] });
      toast.success("Stock updated successfully!");
      setEditingId(null);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Update failed");
    },
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <Loader2 className="animate-spin text-pink-600" size={40} />
      <p className="mt-2 text-gray-500">Loading inventory records...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-500">Track and manage your product stock levels</p>
        </div>
        <div className="bg-pink-50 border border-pink-100 p-3 rounded-xl flex items-center gap-3">
          <Package className="text-pink-600" size={24} />
          <div>
            <p className="text-xs text-gray-500 uppercase font-bold">Total Products</p>
            <p className="text-xl font-black text-pink-700">{inventoryData.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b text-sm">
              <tr>
                <th className="p-4 font-semibold text-gray-700">Product Info</th>
                <th className="p-4 font-semibold text-gray-700">SKU</th>
                <th className="p-4 font-semibold text-gray-700">Current Stock</th>
                <th className="p-4 font-semibold text-gray-700">Status</th>
                <th className="p-4 font-semibold text-gray-700 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {inventoryData.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={item.product?.images?.[0] || "/placeholder.jpg"} 
                        className="w-12 h-12 rounded-lg object-cover border" 
                        alt="" 
                      />
                      <div>
                        <p className="font-bold text-gray-800 line-clamp-1">{item.product?.title}</p>
                        <p className="text-[10px] text-gray-400">Price: ৳{item.product?.price}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-gray-500">{item.product?.sku || "N/A"}</td>
                  <td className="p-4">
                    {editingId === item.productId ? (
                      <input
                        type="number"
                        className="w-20 p-2 border-2 border-pink-500 rounded-lg outline-none"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(parseInt(e.target.value))}
                        autoFocus
                      />
                    ) : (
                      <span className={`text-lg font-bold ${item.quantity <= 5 ? 'text-red-600' : 'text-gray-700'}`}>
                        {item.quantity}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {item.quantity <= 5 ? (
                      <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full w-fit animate-pulse">
                        <AlertTriangle size={12} />
                        <span className="text-[10px] font-bold uppercase">Low Stock</span>
                      </div>
                    ) : (
                      <div className="text-green-500 bg-green-50 px-2 py-1 rounded-full w-fit text-[10px] font-bold uppercase">
                        Healthy
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {editingId === item.productId ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateMutation.mutate({ productId: item.productId, quantity: newQuantity })}
                          disabled={updateMutation.isPending}
                          className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                          {updateMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          setEditingId(item.productId);
                          setNewQuantity(item.quantity);
                        }}
                        className="p-2 bg-pink-50 text-pink-600 rounded-lg hover:bg-pink-600 hover:text-white transition"
                      >
                        <Edit3 size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}