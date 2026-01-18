/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductService } from "@/app/services/product.service";
import {
  Save,
  ArrowLeft,
  Image as ImageIcon,
  Tag,
  Hash,
  Banknote,
  Loader2,
  Edit3,
  AlertCircle,
} from "lucide-react";
import { toast } from "sonner";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const productId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    images: "",
  });

  // Fetch product data
  useEffect(() => {
    if (!productId) return;

    ProductService.getById(productId)
      .then((res: any) => {
        const p = res.data || res;
        setForm({
          title: p.title || "",
          description: p.description || "",
          price: p.price || 0,
          stock: p.stock || 0,
          images: p.images?.[0] || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        toast.error("Failed to load product data");
        setLoading(false);
      });
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await ProductService.update(productId, {
        ...form,
        images: [form.images],
      });

      toast.success("Product updated successfully");
      router.push("/admin/products");
      router.refresh();
    } catch (err) {
      console.error("Update error:", err);
      toast.error("System failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400">
        <Loader2 className="h-10 w-10 animate-spin text-[#6C5DD3] mb-4" />
        <p className="font-black tracking-widest uppercase text-[10px]">
          Retrieving Product Data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      {/* Top Navigation */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-[#6C5DD3] transition-colors mb-8 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-xs font-bold uppercase tracking-widest">
          Discard Changes
        </span>
      </button>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left Side: Editor Form */}
        <div className="flex-1">
          <div className="mb-8 flex items-center gap-4">
            <div className="bg-amber-100 p-3 rounded-2xl">
              <Edit3 className="text-amber-600" size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
                Edit <span className="text-[#6C5DD3]">Product</span>
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Updating ID: {productId.slice(-6).toUpperCase()}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-50 dark:border-gray-800 shadow-sm space-y-6">
              {/* Product Title */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag size={12} /> Product Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none text-gray-800 dark:text-white"
                  required
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle size={12} /> Detailed Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-medium h-40 focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none resize-none text-gray-700 dark:text-gray-300"
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
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none text-gray-800 dark:text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Hash size={12} /> Update Stock
                  </label>
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none text-gray-800 dark:text-white"
                    required
                  />
                </div>
              </div>

              {/* Image URL */}
              <div className="space-y-2">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={12} /> Product Image Source
                </label>
                <input
                  name="images"
                  value={form.images}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-4 rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#6C5DD3]/20 transition-all outline-none text-[#6C5DD3]"
                />
              </div>

              <div className="pt-4 flex gap-4">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-[#6C5DD3] hover:bg-[#5a4cb3] text-white font-black uppercase tracking-widest py-4 rounded-2xl shadow-xl shadow-purple-200 dark:shadow-none transition-all active:scale-[0.98] disabled:bg-gray-300 flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <Loader2 className="animate-spin" size={20} />
                  ) : (
                    <>
                      <Save size={20} /> Commit Changes
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right Side: Current Appearance Preview */}
        <div className="lg:w-80">
          <div className="sticky top-8">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-2">
              Current Appearance
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden border border-gray-50 dark:border-gray-800 shadow-xl group">
              <div className="aspect-4/5 bg-gray-100 dark:bg-gray-800 relative">
                {form.images ? (
                  <img
                    src={form.images}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Preview"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-300">
                    <ImageIcon size={48} className="mb-2" />
                    <span className="text-[10px] font-bold uppercase">
                      No Image Set
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 p-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <Edit3 size={14} className="text-[#6C5DD3]" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-gray-800 dark:text-white truncate uppercase tracking-tight">
                  {form.title || "Untitled Product"}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <span className="text-[#6C5DD3] font-black text-lg">
                    ৳{form.price}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${form.stock > 10 ? "bg-green-500" : "bg-amber-500"} animate-pulse`}
                    />
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      {form.stock} Units Left
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-amber-50 dark:bg-amber-900/10 p-5 rounded-3xl border border-amber-100 dark:border-amber-900/20">
              <div className="flex items-center gap-2 mb-2 text-amber-700 dark:text-amber-400">
                <AlertCircle size={14} />
                <span className="text-[10px] font-black uppercase tracking-wider">
                  Editor Note
                </span>
              </div>
              <p className="text-[11px] text-amber-600 dark:text-amber-500/80 leading-relaxed font-medium">
                Changes made here will be reflected instantly on the storefront
                once you commit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
