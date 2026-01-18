/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { ProductService } from "@/app/services/product.service";
import ProductRow from "./ProductRow";
import { useRouter } from "next/navigation";
import { Plus, Package, Edit, Trash2, Loader2, Search } from "lucide-react";

export default function AdminProducts() {
  const [productsData, setProductsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  useEffect(() => {
    ProductService.getAll()
      .then((res: any) => {
        setProductsData(res.data?.data || res.data || res);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const productList = Array.isArray(productsData) 
    ? productsData 
    : productsData?.result || [];


  const filteredProducts = productList.filter((p: any) => 
    (p.title || p.name).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleted = (id: string) => {
    if (Array.isArray(productsData)) {
      setProductsData(productsData.filter((p: any) => p.id !== id));
    } else {
      setProductsData({
        ...productsData,
        result: productList.filter((p: any) => p.id !== id)
      });
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await ProductService.delete(id);
      handleDeleted(id);
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white">
            Inventory <span className="text-[#6C5DD3]">Management</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">
            Total {productList.length} products in your catalog
          </p>
        </div>
        
        <div className="flex w-full md:w-auto items-center gap-3">
           <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search products..."
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-[#6C5DD3] outline-none dark:text-gray-200"
              />
           </div>
           <button
            onClick={() => router.push("/admin/products/add")}
            className="bg-[#6C5DD3] hover:bg-[#5a4cb3] text-white px-5 py-2.5 rounded-xl shadow-lg shadow-purple-200 dark:shadow-none transition-all flex items-center justify-center gap-2 font-bold whitespace-nowrap"
          >
            <Plus size={20} /> Add New
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 text-gray-500 dark:text-gray-400">
          <Loader2 className="animate-spin mb-4 text-[#6C5DD3]" size={40} />
          <p className="font-bold tracking-widest uppercase text-xs">Fetching Inventory...</p>
        </div>
      ) : (
        <>
          {/* Desktop View Table */}
          <div className="hidden lg:block bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800 rounded-[24px] overflow-hidden transition-all">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/50 dark:bg-gray-800/50 text-gray-400 dark:text-gray-500 text-[11px] font-black uppercase tracking-widest">
                  <th className="px-6 py-5">Product Details</th>
                  <th className="px-6 py-5 text-center">Price</th>
                  <th className="px-6 py-5 text-center">Stock Status</th>
                  <th className="px-6 py-5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {filteredProducts.map((p: any) => (
                  <ProductRow key={p.id} product={p} onDeleted={handleDeleted} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View Cards */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-5">
            {filteredProducts.map((p: any) => (
              <div key={p.id} className="bg-white dark:bg-gray-900 p-6 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm group transition-all hover:border-purple-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                     <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden">
                        <img src={p.images?.[0] || "https://via.placeholder.com/150"} alt="" className="w-full h-full object-cover" />
                     </div>
                     <div>
                        <h3 className="font-bold text-gray-800 dark:text-gray-200 text-base line-clamp-1">{p.title || p.name}</h3>
                        <p className="text-[10px] text-gray-400 uppercase font-black tracking-tighter">{p.sku || 'No SKU'}</p>
                     </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-5 bg-gray-50 dark:bg-gray-800/50 p-3 rounded-2xl">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block font-bold">Price</span>
                    <span className="font-black text-[#6C5DD3] dark:text-purple-400">৳{p.price}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase block font-bold">Stock</span>
                    <span className={`font-black ${(p.inventory?.quantity || p.stock) < 10 ? 'text-red-500' : 'text-green-500'}`}>
                      {p.inventory?.quantity || p.stock || 0} Units
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => router.push(`/admin/products/edit/${p.id}`)}
                    className="flex-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all hover:bg-blue-600 hover:text-white"
                  >
                    <Edit size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 py-2.5 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all hover:bg-red-600 hover:text-white"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && filteredProducts.length === 0 && (
        <div className="text-center py-24 bg-white dark:bg-gray-900 rounded-[32px] border-2 border-dashed border-gray-100 dark:border-gray-800 transition-all">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="text-gray-300 dark:text-gray-600" size={40} />
          </div>
          <h3 className="text-gray-800 dark:text-gray-200 font-bold text-lg">No products match your search</h3>
          <p className="text-gray-400 dark:text-gray-500 text-sm">Try adjusting your filters or add a new product.</p>
        </div>
      )}
    </div>
  );
}