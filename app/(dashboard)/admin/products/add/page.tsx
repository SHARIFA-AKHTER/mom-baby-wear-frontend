/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductService } from "@/app/services/product.service";

export default function AddProductPage() {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    images: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
     
//       await ProductService.create({
//         ...form,
//         images: form.images ? [form.images] : [],
//       });

//       alert("Product added successfully!");
//       router.push("/admin/products"); 
//       router.refresh();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to add product");
//     } finally {
//       setSaving(false);
//     }
//   };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setSaving(true);

  const payload = {
    title: form.title,
    description: form.description,
    price: Number(form.price),
    stock: Number(form.stock),
    images: form.images ? [form.images] : [],
  
    categoryId: "417057a2-05bf-4586-936a-829b6dada73d", 
  };

  try {
    const res = await ProductService.create(payload);
    if (res.success) {
      alert("Product Created Successfully!");
      router.push("/admin/products");
      router.refresh();
    }
  } catch (err: any) {
    console.error("Error details:", err.response?.data);
    alert(err.response?.data?.message || "Something went wrong");
  } finally {
    setSaving(false);
  }
};
  return (
    <div className="p-4 md:p-6 max-w-lg mx-auto bg-white shadow-lg rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-6 text-green-600">Add New Product</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-semibold mb-1">Product Title</label>
          <input
            name="title"
            placeholder="e.g. Baby Romper"
            value={form.title}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Description</label>
          <textarea
            name="description"
            placeholder="Product details..."
            value={form.description}
            onChange={handleChange}
            className="w-full border p-2 rounded h-24"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Price (৳)</label>
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
            <label className="block font-semibold mb-1">Stock Amount</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>
        </div>

        <div>
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            name="images"
            placeholder="https://example.com/image.jpg"
            value={form.images}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="flex-1 border py-2 rounded font-semibold hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded transition disabled:bg-gray-400"
          >
            {saving ? "Saving..." : "Save Product"}
          </button>
        </div>
      </form>
    </div>
  );
}