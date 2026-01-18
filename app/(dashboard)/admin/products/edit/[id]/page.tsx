/* eslint-disable react/no-unescaped-entities */
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
  Percent,
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
    discountPrice: 0, // 🆕 Added discountPrice
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
          discountPrice: p.discountPrice || 0,
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
      // 🆕 Included discountPrice in numeric conversion
      [name]:
        name === "price" || name === "stock" || name === "discountPrice"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();         
    setSaving(true);

    try {
      const updateData: any = {
        ...form,
        discountPrice:
          form.discountPrice > 0 ? Number(form.discountPrice) : null,
        images: [form.images],
      };

      await ProductService.update(productId, updateData);

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

  // 🆕 Preview logic for discount badge
  const showDiscountBadge =
    form.discountPrice > 0 && form.discountPrice < form.price;
  const discountPercentage = showDiscountBadge
    ? Math.round(((form.price - form.discountPrice) / form.price) * 100)
    : 0;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-gray-400 px-4 text-center">
        <Loader2 className="h-10 w-10 animate-spin text-[#6C5DD3] mb-4" />
        <p className="font-black tracking-widest uppercase text-[10px]">
          Retrieving Product Data...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-8 px-4">
      {/* Navigation */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-500 hover:text-[#6C5DD3] transition-colors mb-6 md:mb-8 group"
      >
        <ArrowLeft
          size={18}
          className="group-hover:-translate-x-1 transition-transform"
        />
        <span className="text-[10px] font-black uppercase tracking-widest">
          Discard Changes
        </span>
      </button>

      <div className="flex flex-col lg:flex-row gap-8 xl:gap-12">
        {/* Editor Form */}
        <div className="flex-1 order-2 lg:order-1">
          <div className="mb-6 md:mb-8 flex items-center gap-4">
            <div className="bg-amber-100 dark:bg-amber-900/30 p-3 rounded-2xl">
              <Edit3 className="text-amber-600 dark:text-amber-400" size={24} />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
                Edit <span className="text-[#6C5DD3]">Product</span>
              </h1>
              <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">
                REF: {productId.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="bg-white dark:bg-gray-900 p-5 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm space-y-5">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <Tag size={12} /> Product Title
                </label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3.5 md:p-4 rounded-xl md:rounded-2xl text-sm font-bold focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <AlertCircle size={12} /> Description
                </label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3.5 md:p-4 rounded-xl md:rounded-2xl text-sm font-medium h-32 md:h-40 focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none resize-none"
                />
              </div>

              {/* Pricing & Stock Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Banknote size={12} /> Regular Price
                  </label>
                  <input
                    name="price"
                    type="number"
                    value={form.price}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3.5 md:p-4 rounded-xl md:rounded-2xl text-sm font-bold outline-none"
                    required
                  />
                </div>

                {/* 🆕 Discount Price Field */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-pink-500 uppercase tracking-widest flex items-center gap-2">
                    <Percent size={12} /> Discount Price
                  </label>
                  <input
                    name="discountPrice"
                    type="number"
                    value={form.discountPrice}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3.5 md:p-4 rounded-xl md:rounded-2xl text-sm font-bold outline-none border-2 border-transparent focus:border-pink-100 dark:focus:border-pink-900/20"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                    <Hash size={12} /> Stock
                  </label>
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3.5 md:p-4 rounded-xl md:rounded-2xl text-sm font-bold outline-none"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <ImageIcon size={12} /> Image Source URL
                </label>
                <input
                  name="images"
                  value={form.images}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-gray-800 border-none p-3.5 md:p-4 rounded-xl md:rounded-2xl text-sm font-medium focus:ring-2 focus:ring-[#6C5DD3]/20 outline-none text-[#6C5DD3]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full bg-[#6C5DD3] hover:bg-[#5a4cb3] text-white font-black uppercase tracking-widest py-4 rounded-xl md:rounded-2xl shadow-lg transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
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

        {/* Live Preview Card */}
        <div className="w-full lg:w-80 order-1 lg:order-2">
          <div className="lg:sticky lg:top-8">
            <h2 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 ml-1">
              Live Appearance
            </h2>
            <div className="bg-white dark:bg-gray-900 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl group">
              <div className="aspect-[4/5] bg-gray-100 dark:bg-gray-800 relative">
                {form.images ? (
                  <img
                    src={form.images}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    alt="Preview"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-300">
                    <ImageIcon size={40} className="mb-2" />
                    <span className="text-[9px] font-bold uppercase">
                      No Image Set
                    </span>
                  </div>
                )}

                {/* 🆕 Discount Badge Preview */}
                {showDiscountBadge && (
                  <div className="absolute top-4 right-4 z-10 bg-pink-600 text-white text-[10px] font-black px-2 py-1 rounded-full animate-pulse shadow-lg">
                    {discountPercentage}% OFF
                  </div>
                )}

                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm dark:bg-gray-900/90 p-2 rounded-xl shadow-sm border border-gray-100 dark:border-gray-800">
                    <Edit3 size={14} className="text-[#6C5DD3]" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-black text-gray-800 dark:text-white truncate uppercase tracking-tight text-sm">
                  {form.title || "Untitled Product"}
                </h3>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex flex-col">
                    {/* 🆕 Conditional Price Preview */}
                    {showDiscountBadge ? (
                      <>
                        <span className="text-pink-600 font-black text-lg leading-none">
                          ৳{form.discountPrice}
                        </span>
                        <span className="text-gray-400 line-through text-[10px] font-bold">
                          ৳{form.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-[#6C5DD3] font-black text-lg">
                        ৳{form.price}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div
                      className={`w-2 h-2 rounded-full ${form.stock > 10 ? "bg-green-500" : "bg-amber-500"} animate-pulse`}
                    />
                    <span className="text-[9px] font-black text-gray-400 uppercase">
                      {form.stock} Units
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50/50 dark:bg-blue-900/10 p-4 rounded-2xl border border-blue-100/50 dark:border-blue-900/20">
              <p className="text-[10px] text-blue-600 dark:text-blue-400 leading-relaxed font-medium italic">
                "Tip: Adding a discount price will trigger the promotional badge
                on the card."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
