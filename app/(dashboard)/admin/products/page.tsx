/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { ProductService } from "@/app/services/product.service";
import ProductRow from "./ProductRow";
import { useRouter } from "next/navigation";
import { Plus, Package, Edit, Trash2, Loader2 } from "lucide-react";

export default function AdminProducts() {
  
  const [productsData, setProductsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
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
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Manage Products</h1>
          <p className="text-gray-500 text-sm mt-1">
            Total {productList.length} products found
          </p>
        </div>
        <button
          onClick={() => router.push("/admin/products/add")}
          className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg shadow-md transition-all flex items-center justify-center gap-2 font-medium"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 text-gray-500">
          <Loader2 className="animate-spin mb-2" size={32} />
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          {/* Desktop View */}
          <div className="hidden lg:block bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 border-b border-gray-200">
                <tr>
                  <th className="p-4 font-semibold text-gray-700">Product Title</th>
                  <th className="p-4 font-semibold text-gray-700 text-center">Price</th>
                  <th className="p-4 font-semibold text-gray-700 text-center">Stock</th>
                  <th className="p-4 font-semibold text-gray-700 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {productList.map((p: any) => (
                  <ProductRow key={p.id} product={p} onDeleted={handleDeleted} />
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile View */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
            {productList.map((p: any) => (
              <div key={p.id} className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold text-gray-800 text-lg line-clamp-1">{p.title || p.name}</h3>
                  <span className={`px-2 py-1 rounded-md text-xs font-bold ${
                    (p.inventory?.quantity || p.stock) > 0 ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                  }`}>
                    {(p.inventory?.quantity || p.stock) > 0 ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Price:</span>
                    <span className="font-semibold text-blue-600">৳ {p.price}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Stock Available:</span>
                    <span className="font-semibold text-gray-700">{p.inventory?.quantity || p.stock || 0} pcs</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => router.push(`/admin/products/edit/${p.id}`)}
                    className="flex-1 bg-blue-50 text-blue-600 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Edit size={16} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg flex items-center justify-center gap-2 text-sm font-semibold"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Empty State */}
      {!loading && productList.length === 0 && (
        <div className="text-center py-20 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <Package className="mx-auto text-gray-300 mb-4" size={48} />
          <p className="text-gray-500 font-medium">No products found. Start by adding one!</p>
        </div>
      )}
    </div>
  );
}