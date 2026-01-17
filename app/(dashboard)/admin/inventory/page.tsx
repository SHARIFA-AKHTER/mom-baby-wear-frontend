/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryService } from "@/app/services/inventory.service";
import { Loader2, AlertTriangle, Edit3, Package, Save, X, Search, Boxes } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminInventoryPage() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError } = useQuery({
    queryKey: ["admin-inventory"],
    queryFn: () => InventoryService.getAll(),
  });


  const rawData = data?.data || data;
  const inventoryData: any[] = Array.isArray(rawData) ? rawData : rawData?.result || [];

  const filteredData = inventoryData.filter((item: any) =>
    item.product?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.product?.sku?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <p className="mt-2 text-gray-500 font-medium">Loading inventory records...</p>
    </div>
  );

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto bg-gray-50/30 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900">Inventory Management</h1>
          <p className="text-sm text-gray-500 mt-1">Track and manage your product stock levels</p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="relative group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 transition-colors" size={18} />
                <input 
                    type="text" 
                    placeholder="Search by name or SKU..."
                    className="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-pink-500/20 focus:border-pink-500 transition-all w-full md:w-64 shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="bg-white border border-gray-100 p-2.5 rounded-xl flex items-center gap-3 shadow-sm px-4">
                <Package className="text-pink-600" size={20} />
                <div className="leading-tight">
                    <p className="text-[10px] text-gray-400 uppercase font-black">Total Items</p>
                    <p className="text-lg font-black text-gray-800">{inventoryData.length}</p>
                </div>
            </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white border border-gray-100 rounded-[24px] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100 text-xs uppercase font-bold text-gray-500">
              <tr>
                <th className="p-4">Product Info</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredData.map((item: any) => (
                <tr key={item.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img 
                            src={item.product?.images?.[0] || "/placeholder.jpg"} 
                            className="w-12 h-12 rounded-xl object-cover border border-gray-100 shadow-sm" 
                            alt="" 
                        />
                        {item.quantity === 0 && (
                             <div className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center">
                                <span className="text-[8px] text-white font-bold uppercase">Out</span>
                             </div>
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800 line-clamp-1 group-hover:text-pink-600 transition-colors">{item.product?.title}</p>
                        <p className="text-[10px] text-gray-400 font-medium">Price: ৳{item.product?.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md font-mono text-[10px] font-bold">
                        {item.product?.sku || "NO-SKU"}
                    </span>
                  </td>
                  <td className="p-4">
                    {editingId === item.productId ? (
                      <div className="flex items-center gap-1">
                          <input
                            type="number"
                            className="w-20 p-2 border-2 border-pink-500 rounded-lg outline-none font-bold text-gray-800 shadow-inner"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                            autoFocus
                          />
                      </div>
                    ) : (
                      <span className={`text-base font-black ${item.quantity <= 5 ? 'text-red-600' : 'text-gray-700'}`}>
                        {item.quantity}
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    {item.quantity <= 5 ? (
                      <div className="flex items-center gap-1.5 text-red-600 bg-red-50 px-2.5 py-1 rounded-full w-fit border border-red-100 animate-pulse">
                        <AlertTriangle size={12} />
                        <span className="text-[10px] font-black uppercase tracking-wider">Low Stock</span>
                      </div>
                    ) : (
                      <div className="text-green-600 bg-green-50 px-2.5 py-1 rounded-full w-fit text-[10px] font-black uppercase tracking-wider border border-green-100">
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
                          className="p-2 bg-green-600 text-white rounded-xl hover:bg-green-700 shadow-sm active:scale-95 transition-all"
                          title="Save"
                        >
                          {updateMutation.isPending ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="p-2 bg-gray-100 text-gray-500 rounded-xl hover:bg-gray-200 active:scale-95 transition-all"
                          title="Cancel"
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
                        className="p-2.5 bg-pink-50 text-pink-600 rounded-xl hover:bg-pink-600 hover:text-white transition-all shadow-sm group-hover:shadow-pink-100"
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
        
        {/* Empty State */}
        {filteredData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                <Boxes size={48} className="mb-4 text-gray-200" />
                <p className="font-medium">No inventory records found</p>
            </div>
        )}
      </div>
    </div>
  );
}