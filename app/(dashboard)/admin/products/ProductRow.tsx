/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ProductService } from "@/app/services/product.service";

interface Props {
  product: any;
  onDeleted?: (id: string) => void;
}

export default function ProductRow({ product, onDeleted }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure?")) return;
    setLoading(true);
    try {
      await ProductService.delete(product.id);
      onDeleted?.(product.id);
    } catch (err) {
      alert("Failed to delete product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <tr className="border-t hover:bg-gray-50 transition">
      <td className="p-3 font-medium">{product.title}</td>
      <td className="p-3 text-center">৳ {product.price}</td>
      <td className="p-3 text-center">{product.stock}</td>
      <td className="p-3 text-center space-x-2">
        <button
          onClick={() => router.push(`/admin/products/edit/${product.id}`)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={loading}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:bg-gray-400"
        >
          {loading ? "..." : "Delete"}
        </button>
      </td>
    </tr>
  );
}