/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ProductService } from "@/app/services/product.service";
import { CategoryService } from "@/app/services/category.service";
import { 
  Plus, 
  ArrowLeft, 
  Image as ImageIcon, 
  Tag, 
  Hash, 
  Banknote, 
  LayoutGrid, 
  Loader2,
  Sparkles
} from "lucide-react"; 
import { toast } from "sonner";

export default function AddProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]>([]); 
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    images: "",
    categoryId: "", 
  });

  useEffect(() => {
    CategoryService.getAll().then((res: any) => {
      setCategories(res.data || res);
    }).catch(err => {
      console.error("Failed to load categories", err);
      toast.error("Could not load categories");
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.categoryId) {
      toast.error("Please select a category first!");
      return;
    }

    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      price: Number(form.price),
      stock: Number(form.stock),
      images: form.images ? [form.images] : [],
      categoryId: form.categoryId, 
    };

    try {
      const res = await ProductService.create(payload);
      if (res) {
        toast.success("Product launched successfully!");
        router.push("/admin/products");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to create product");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Top Navigation */}
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-[#6C5DD3] transition-colors mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-xs font-bold uppercase tracking-widest">Back to Inventory</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Left Side: Form */}
        <div className="flex-1">
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
              New <span className="text-[#6C5DD3]">Product</span>
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fill in the details to list your item.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 shadow-sm space-y-6">
              
              {/* Category & Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <LayoutGrid size={12} /> Category
                  </label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={12} /> Product Title
                  </label>
                  <input
                    name="title"
                    placeholder="e.g. Premium Cotton Tee"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={12} /> Description
                </label>
                <textarea
                  name="description"
                  placeholder="Tell the story of this product..."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-medium h-32 focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none resize-none"
                />
              </div>

              {/* Price & Stock */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Banknote size={12} /> Price (৳)
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Hash size={12} /> Inventory Stock
                  </label>
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={12} /> Cover Image URL
                </label>
                <input
                  name="images"
                  placeholder="https://images.unsplash.com/..."
                  value={form.images}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#6C5DD3] hover:bg-[#5a4cb3] text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-purple-200 dark:shadow-none transition-all active:scale-[0.98] disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Plus size={20} /> Launch Product
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Side: Preview Card */}
        <div className="lg:w-80">
          <div className="sticky top-8">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">Live Preview</h2>
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-50 dark:border-gray-800 shadow-xl group">
              <div className="aspect-4/5 bg-gray-100 dark:bg-gray-800 relative">
                {form.images ? (
                  <img src={form.images} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="Preview" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-300">
                    <ImageIcon size={48} className="mb-2" />
                    <span className="text-[10px] font-bold uppercase">No Image</span>
                  </div>
                )}
                <div className="absolute top-4 left-4">
                  <span className="bg-[#6C5DD3] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg">
                    {categories.find(c => c.id === form.categoryId)?.name || "Category"}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-gray-800 dark:text-white truncate uppercase tracking-tight">
                  {form.title || "Product Title"}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-[#6C5DD3] font-black text-lg">৳{form.price}</span>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border ${form.stock > 0 ? 'border-green-100 text-green-500' : 'border-red-100 text-red-500'}`}>
                    {form.stock > 0 ? `${form.stock} IN STOCK` : 'OUT OF STOCK'}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/10 p-5 rounded-3xl border border-blue-100 dark:border-blue-900/20">
               <p className="text-[11px] text-blue-600 dark:text-blue-400 leading-relaxed font-medium italic">
                 "Make sure your product title and description contain relevant keywords to improve search results."
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}