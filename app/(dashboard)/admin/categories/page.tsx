/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { CategoryService } from "@/app/services/category.service";
import { Trash2, Edit, Plus, Loader2, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await CategoryService.getAll();
      setCategories(res.data || res);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await CategoryService.delete(id);
        toast.success("Category deleted successfully");
        fetchCategories();
      } catch (error: any) {
        toast.error(error.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              Category <span className="text-pink-600">Management</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">Organize and manage your shop categories</p>
          </div>
          
          <button className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-pink-100 transition-all active:scale-95">
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-pink-500 mb-4" size={40} />
            <p className="text-gray-500 animate-pulse">Loading categories...</p>
          </div>
        ) : (
          <>
            {/* Desktop & Tablet View (Table) */}
            <div className="hidden md:block bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-gray-50/50 border-b border-gray-100">
                  <tr>
                    <th className="p-6 text-xs uppercase tracking-wider font-bold text-gray-500">Preview</th>
                    <th className="p-6 text-xs uppercase tracking-wider font-bold text-gray-500">Details</th>
                    <th className="p-6 text-xs uppercase tracking-wider font-bold text-gray-500">Slug</th>
                    <th className="p-6 text-xs uppercase tracking-wider font-bold text-gray-500 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {categories.map((cat) => (
                    <tr key={cat.id} className="hover:bg-pink-50/30 transition-colors group">
                      <td className="p-6">
                        <div className="w-14 h-14 relative rounded-2xl overflow-hidden border-2 border-white shadow-sm">
                          <img src={cat.image} alt={cat.name} className="object-cover w-full h-full" />
                        </div>
                      </td>
                      <td className="p-6">
                        <span className="font-bold text-gray-800 text-lg">{cat.name}</span>
                        {cat.description && <p className="text-xs text-gray-400 line-clamp-1">{cat.description}</p>}
                      </td>
                      <td className="p-6">
                        <code className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                          {cat.slug}
                        </code>
                      </td>
                      <td className="p-6 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-3 bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white rounded-xl transition-all">
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(cat.id)}
                            className="p-3 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white rounded-xl transition-all"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile View (Cards) */}
            <div className="grid grid-cols-1 gap-4 md:hidden">
              {categories.map((cat) => (
                <div key={cat.id} className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0">
                    <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-800 truncate">{cat.name}</h3>
                    <p className="text-xs text-gray-500 truncate mb-3 italic">/{cat.slug}</p>
                    <div className="flex gap-2">
                      <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-gray-50 text-blue-600 rounded-xl text-xs font-bold">
                        <Edit size={14} /> Edit
                      </button>
                      <button 
                        onClick={() => handleDelete(cat.id)}
                        className="flex-1 flex items-center justify-center gap-1 py-2 bg-red-50 text-red-600 rounded-xl text-xs font-bold"
                      >
                        <Trash2 size={14} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Empty State */}
            {!loading && categories.length === 0 && (
              <div className="bg-white rounded-[2rem] p-20 text-center border border-dashed border-gray-200">
                <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                   <Search size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-800">No Categories Found</h3>
                <p className="text-gray-500">Start by adding your first category!</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}