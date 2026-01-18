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
  Sparkles,
  Percent
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
    discountPrice: 0,
    stock: 0,
    images: "",
    categoryId: "",
  });

  useEffect(() => {
    CategoryService.getAll()
      .then((res: any) => {
        setCategories(res.data || res);
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
        toast.error("Could not load categories");
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" || name === "discountPrice" ? Number(value) : value,
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
      ...form,
      price: Number(form.price),
      discountPrice: form.discountPrice > 0 ? Number(form.discountPrice) : null,
      stock: Number(form.stock),
      images: form.images ? [form.images] : [],
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

  const showDiscountBadge = form.discountPrice > 0 && form.discountPrice < form.price;
  const discountPercentage = showDiscountBadge 
    ? Math.round(((form.price - form.discountPrice) / form.price) * 100) 
    : 0;

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-8 px-4">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-[#6C5DD3] transition-colors mb-6 md:mb-8 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-[10px] font-black uppercase tracking-widest">Back to Inventory</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
        {/* Left Side: Form Container */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
              New <span className="text-[#6C5DD3]">Product</span>
            </h1>
            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
              List your item with all the necessary details.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="bg-white dark:bg-gray-900 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-5 md:space-y-6">
              
              {/* Category & Title */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <LayoutGrid size={12} /> Category
                  </label>
                  <select
                    name="categoryId"
                    value={form.categoryId}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold outline-none focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat: any) => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Tag size={12} /> Title
                  </label>
                  <input
                    name="title"
                    placeholder="Premium Cotton Tee"
                    value={form.title}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold outline-none focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Sparkles size={12} /> Story
                </label>
                <textarea
                  name="description"
                  placeholder="Tell the story of this product..."
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-medium h-24 md:h-32 outline-none focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all resize-none"
                />
              </div>

              {/* Pricing & Stock - 3 columns on tablet/desktop, 1 on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Banknote size={12} /> Price (৳)
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold outline-none"
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-pink-500 uppercase tracking-widest flex items-center gap-2">
                    <Percent size={12} /> Discount
                  </label>
                  <input
                    name="discountPrice"
                    type="number"
                    value={form.discountPrice}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold outline-none border-2 border-transparent focus:border-pink-100 dark:focus:border-pink-900/30"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2 md:col-span-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Hash size={12} /> Stock
                  </label>
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm font-bold outline-none"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={12} /> Image URL
                </label>
                <input
                  name="images"
                  placeholder="https://..."
                  value={form.images}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3 md:p-4 rounded-xl md:rounded-2xl text-xs md:text-sm outline-none focus:ring-2 focus:ring-[#6C5DD3]/20"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#6C5DD3] hover:bg-[#5a4cb3] text-white font-black uppercase tracking-widest py-3.5 md:py-4 rounded-xl md:rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 className="animate-spin" size={20} /> : <><Plus size={20} /> Launch Product</>}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Side: Preview Card - Visible at the top on Mobile for instant feedback */}
        <div className="w-full lg:w-80 order-1 lg:order-2">
          <div className="lg:sticky lg:top-8">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">Live Preview</h2>
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl group">
              <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 relative">
                {form.images ? (
                  <img src={form.images} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview" />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-300">
                    <ImageIcon size={40} className="mb-2" />
                    <span className="text-[9px] font-bold uppercase">Awaiting Image</span>
                  </div>
                )}
                
                {showDiscountBadge && (
                  <div className="absolute top-4 right-4 z-10 bg-pink-600 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse shadow-lg">
                    {discountPercentage}% OFF
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <span className="bg-[#6C5DD3] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-tighter">
                    {categories.find((c) => c.id === form.categoryId)?.name || "Category"}
                  </span>
                </div>
              </div>
              
              <div className="p-5">
                <h3 className="font-black text-gray-800 dark:text-white truncate uppercase tracking-tight text-sm">
                  {form.title || "Product Title"}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex flex-col">
                    {showDiscountBadge ? (
                      <>
                        <span className="text-pink-600 font-black text-base md:text-lg leading-none">৳{form.discountPrice}</span>
                        <span className="text-gray-400 line-through text-[10px] font-bold">৳{form.price}</span>
                      </>
                    ) : (
                      <span className="text-[#6C5DD3] font-black text-base md:text-lg">৳{form.price}</span>
                    )}
                  </div>
                  <span className={`text-[8px] font-black px-2 py-0.5 rounded border ${form.stock > 0 ? "border-green-100 text-green-500" : "border-red-100 text-red-500"}`}>
                    {form.stock > 0 ? "IN STOCK" : "OUT"}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Suggestion box hidden on mobile to save space, shown on large screens */}
            <div className="mt-6 hidden lg:block bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
              <p className="text-[10px] text-blue-600 dark:text-blue-400 leading-relaxed font-medium italic">
                "Tip: Clear high-quality images increase conversion rates by up to 40%."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}