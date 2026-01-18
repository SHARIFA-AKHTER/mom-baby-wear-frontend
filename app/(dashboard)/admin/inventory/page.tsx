/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { InventoryService } from "@/app/services/inventory.service";
import { Loader2, AlertTriangle, Edit3, Package, Save, X, Search, Boxes, TrendingDown, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminInventoryPage() {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newQuantity, setNewQuantity] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useQuery({
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
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
      <Loader2 className="animate-spin text-[#6C5DD3] mb-4" size={40} />
      <p className="font-black tracking-widest uppercase text-xs">Auditing Stock...</p>
    </div>
  );

  return (
    <div className="transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
            Stock <span className="text-[#6C5DD3]">Control</span>
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Real-time product availability tracking</p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search SKU or Name..." 
              className="pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-[#6C5DD3] transition-all dark:text-gray-200 w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="bg-[#6C5DD3] text-white px-6 py-2.5 rounded-2xl flex items-center gap-3 shadow-xl shadow-purple-200 dark:shadow-none">
             <Package size={20} />
             <div className="leading-tight border-l border-white/20 pl-3">
                <p className="text-[10px] font-black uppercase opacity-70">Inventory</p>
                <p className="text-lg font-black">{inventoryData.length}</p>
             </div>
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
              <tr className="text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                <th className="p-6">Product Details</th>
                <th className="p-6">SKU ID</th>
                <th className="p-6 text-center">Stock Level</th>
                <th className="p-6">Availability</th>
                <th className="p-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {filteredData.map((item: any) => (
                <tr key={item.id} className="hover:bg-purple-50/30 dark:hover:bg-purple-900/5 transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="relative flex-shrink-0">
                        <img 
                          src={item.product?.images?.[0] || "/placeholder.jpg"} 
                          className={`w-14 h-14 rounded-2xl object-cover border-2 transition-all ${item.quantity === 0 ? 'grayscale border-red-200' : 'border-gray-100 dark:border-gray-800'}`} 
                          alt="" 
                        />
                        {item.quantity === 0 && (
                          <div className="absolute inset-0 bg-red-600/20 rounded-2xl flex items-center justify-center backdrop-blur-[1px]">
                            <span className="text-[9px] text-white font-black uppercase tracking-tighter bg-red-600 px-1.5 rounded">Empty</span>
                          </div>
                        )}
                      </div>
                      <div className="max-w-[200px]">
                        <p className="font-black text-gray-800 dark:text-gray-200 line-clamp-1 group-hover:text-[#6C5DD3] transition-colors uppercase tracking-tight">{item.product?.title}</p>
                        <p className="text-[10px] text-gray-400 font-bold uppercase mt-1 tracking-tighter">৳{item.product?.price?.toLocaleString()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 rounded-xl font-mono text-[10px] font-black border dark:border-gray-700">
                        {item.product?.sku || "N/A"}
                    </span>
                  </td>
                  <td className="p-6 text-center">
                    {editingId === item.productId ? (
                      <div className="flex items-center justify-center gap-2">
                          <input
                            type="number"
                            className="w-20 p-2.5 bg-white dark:bg-gray-800 border-2 border-[#6C5DD3] rounded-xl outline-none font-black text-gray-800 dark:text-white text-center shadow-lg"
                            value={newQuantity}
                            onChange={(e) => setNewQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                            autoFocus
                          />
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className={`text-xl font-black ${item.quantity <= 5 ? 'text-red-600 animate-pulse' : 'text-gray-800 dark:text-gray-200'}`}>
                          {item.quantity}
                        </span>
                        <div className="w-12 h-1 bg-gray-100 dark:bg-gray-800 rounded-full mt-1 overflow-hidden">
                           <div 
                            className={`h-full ${item.quantity <= 5 ? 'bg-red-500' : 'bg-green-500'}`} 
                            style={{ width: `${Math.min(item.quantity * 10, 100)}%` }}
                           />
                        </div>
                      </div>
                    )}
                  </td>
                  <td className="p-6">
                    {item.quantity <= 5 ? (
                      <div className="flex items-center gap-1.5 text-red-600 bg-red-50 dark:bg-red-900/20 px-3 py-1.5 rounded-xl w-fit border border-red-100 dark:border-red-900/30">
                        <AlertTriangle size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">Restock</span>
                      </div>
                    ) : (
                      <div className="text-green-600 bg-green-50 dark:bg-green-900/20 px-3 py-1.5 rounded-xl w-fit text-[10px] font-black uppercase tracking-widest border border-green-100 dark:border-green-900/30">
                        Available
                      </div>
                    )}
                  </td>
                  <td className="p-6 text-right">
                    {editingId === item.productId ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => updateMutation.mutate({ productId: item.productId, quantity: newQuantity })}
                          className="p-3 bg-green-600 text-white rounded-2xl hover:bg-green-700 active:scale-90 transition-all shadow-lg shadow-green-100 dark:shadow-none"
                        >
                          {updateMutation.isPending ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                        </button>
                        <button 
                          onClick={() => setEditingId(null)}
                          className="p-3 bg-gray-100 dark:bg-gray-800 text-gray-500 rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-700 active:scale-90 transition-all"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          setEditingId(item.productId);
                          setNewQuantity(item.quantity);
                        }}
                        className="p-3 bg-purple-50 dark:bg-purple-900/20 text-[#6C5DD3] rounded-2xl hover:bg-[#6C5DD3] hover:text-white transition-all active:scale-95 group/btn"
                      >
                        <Edit3 size={18} className="group-hover/btn:rotate-12 transition-transform" />
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
            <div className="flex flex-col items-center justify-center py-32 text-gray-400 dark:bg-gray-900">
                <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mb-6">
                  <Boxes size={40} className="text-gray-300 dark:text-gray-600" />
                </div>
                <h3 className="text-gray-800 dark:text-gray-200 font-black text-xl">Inventory Empty</h3>
                <p className="text-sm font-medium mt-2">No stock records found for your search.</p>
            </div>
        )}
      </div>
    </div>
  );
}