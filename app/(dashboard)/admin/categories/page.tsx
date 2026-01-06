/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { CategoryService } from "@/app/services/category.service";
import { Trash2, Edit, Plus, Loader2, Search, X } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", image: "", description: "" });

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

  // Open Modal for Create or Edit
  const openModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ 
        name: category.name, 
        image: category.image, 
        description: category.description || "" 
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", image: "", description: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        // Update logic
        await CategoryService.update(editingCategory.id, formData);
        toast.success("Category updated!");
      } else {
        // Create logic
        await CategoryService.create(formData);
        toast.success("Category created!");
      }
      setIsModalOpen(false);
      fetchCategories();
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Operation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <div className="min-h-screen bg-gray-50/50 p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-900">
              Category <span className="text-pink-600">Management</span>
            </h1>
          </div>
          <button 
            onClick={() => openModal()}
            className="flex items-center justify-center gap-2 bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-pink-100 transition-all active:scale-95"
          >
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>

        {/* Data View (Table & Cards) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20"><Loader2 className="animate-spin text-pink-500" size={40} /></div>
        ) : (
          <div className="hidden md:block bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="p-6 text-xs font-bold text-gray-500 uppercase">Preview</th>
                  <th className="p-6 text-xs font-bold text-gray-500 uppercase">Details</th>
                  <th className="p-6 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-pink-50/30 transition-colors group">
                    <td className="p-6">
                      <img src={cat.image} className="w-14 h-14 rounded-2xl object-cover border" alt="" />
                    </td>
                    <td className="p-6">
                      <span className="font-bold text-gray-800">{cat.name}</span>
                      <p className="text-xs text-gray-400">/{cat.slug}</p>
                    </td>
                    <td className="p-6 text-right">
                      <div className="flex justify-end gap-3">
                        <button onClick={() => openModal(cat)} className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-all"><Edit size={18} /></button>
                        <button onClick={() => handleDelete(cat.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* --- ADD/EDIT MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-gray-900 mb-6">
              {editingCategory ? "Edit" : "Add"} <span className="text-pink-600">Category</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="text-sm font-bold text-gray-600 block mb-2 ml-1">Category Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-pink-200 outline-none transition-all"
                  placeholder="e.g. Baby Dress"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-600 block mb-2 ml-1">Image URL</label>
                <input 
                  type="text" 
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({...formData, image: e.target.value})}
                  className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-pink-200 outline-none transition-all"
                  placeholder="https://image-link.com"
                />
              </div>

              <div>
                <label className="text-sm font-bold text-gray-600 block mb-2 ml-1">Description (Optional)</label>
                <textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-pink-200 outline-none transition-all resize-none"
                  rows={3}
                  placeholder="Short description..."
                />
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full bg-pink-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-pink-100 hover:bg-pink-700 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : editingCategory ? "Update Category" : "Create Category"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}