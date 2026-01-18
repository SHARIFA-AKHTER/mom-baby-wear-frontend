/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useEffect } from "react";
import { CategoryService } from "@/app/services/category.service";
import { Trash2, Edit, Plus, Loader2, X, Image as ImageIcon, Search } from "lucide-react";
import { toast } from "sonner";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [formData, setFormData] = useState({ name: "", image: "", slug: "" });

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

  const generateSlug = (name: string) => {
    return name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData({ ...formData, name, slug: generateSlug(name) });
  };

  const openModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, image: category.image, slug: category.slug });
    } else {
      setEditingCategory(null);
      setFormData({ name: "", image: "", slug: "" });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (editingCategory) {
        await CategoryService.update(editingCategory.id, formData);
        toast.success("Category updated!");
      } else {
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
        toast.success("Category deleted");
        fetchCategories();
      } catch (error: any) {
        toast.error("Failed to delete");
      }
    }
  };

  // Filter logic
  const filteredCategories = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white">
              Category <span className="text-[#6C5DD3]">Collections</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mt-1">Manage your shop categories and hierarchy</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search category..." 
                className="pl-10 pr-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-sm outline-none focus:ring-2 focus:ring-[#6C5DD3] transition-all dark:text-gray-200"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              onClick={() => openModal()}
              className="flex items-center justify-center gap-2 bg-[#6C5DD3] hover:bg-[#5a4cb3] text-white px-6 py-3 rounded-2xl font-bold shadow-lg shadow-purple-200 dark:shadow-none transition-all active:scale-95"
            >
              <Plus size={20} />
              <span>New Category</span>
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-[#6C5DD3]" size={40} />
            <p className="mt-4 text-xs font-bold text-gray-400 uppercase tracking-widest">Loading Categories...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((cat) => (
              <div key={cat.id} className="bg-white dark:bg-gray-900 rounded-[2rem] p-5 border border-gray-50 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-purple-500/5 transition-all group relative overflow-hidden">
                <div className="relative h-40 w-full mb-4 rounded-[1.5rem] overflow-hidden bg-gray-100 dark:bg-gray-800">
                  <img src={cat.image} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt={cat.name} />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                     <button onClick={() => openModal(cat)} className="p-3 bg-white text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0">
                        <Edit size={18} />
                     </button>
                     <button onClick={() => handleDelete(cat.id)} className="p-3 bg-white text-red-600 rounded-xl hover:bg-red-600 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 delay-75">
                        <Trash2 size={18} />
                     </button>
                  </div>
                </div>
                <div>
                  <h3 className="font-black text-gray-800 dark:text-gray-100 text-lg leading-tight">{cat.name}</h3>
                  <p className="text-xs font-bold text-[#6C5DD3] dark:text-purple-400 mt-1 uppercase tracking-tighter">/{cat.slug}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modern Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white dark:bg-gray-900 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in duration-300 border dark:border-gray-800">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 p-2 bg-gray-50 dark:bg-gray-800 rounded-full text-gray-500 hover:text-red-500 transition-colors"
            >
              <X size={20} />
            </button>
            
            <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-6">
              {editingCategory ? "Update" : "Create"} <span className="text-[#6C5DD3]">Category</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Category Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-transparent focus:border-[#6C5DD3] outline-none transition-all dark:text-white"
                  placeholder="e.g. Winter Collection"
                />
              </div>

              <div className="space-y-2 text-gray-400">
                <label className="text-xs font-black uppercase tracking-widest ml-1">Slug (Auto)</label>
                <input 
                  type="text" 
                  readOnly
                  value={formData.slug}
                  className="w-full p-4 bg-gray-100 dark:bg-gray-800/50 rounded-2xl border border-transparent text-gray-400 cursor-not-allowed outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">Image URL</label>
                <div className="relative">
                   <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                   <input 
                    type="text" 
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="w-full p-4 pl-12 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-transparent focus:border-[#6C5DD3] outline-none transition-all dark:text-white"
                    placeholder="https://images.com/cat.jpg"
                  />
                </div>
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full bg-[#6C5DD3] hover:bg-[#5a4cb3] text-white py-4 rounded-2xl font-bold shadow-xl shadow-purple-200 dark:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4"
              >
                {isSubmitting ? <Loader2 className="animate-spin" /> : (editingCategory ? "Save Changes" : "Create Now")}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}