/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ProductService } from "@/app/services/product.service";

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
        setLoading(false);
      });
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

      alert("Product updated successfully");
      router.push("/admin/products");
      router.refresh(); 
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="p-10 text-center">Loading product...</p>;

  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto bg-white shadow rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Title</label>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Price</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            name="images"
            value={form.images}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded transition disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}