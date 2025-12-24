/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/app/utils/axiosInstance";

interface Product {
  id: string;
  title: string;
  description?: string;
  price: number;
  images: string[];
}

export default function ProductPage() {
  const params = useParams();
  const productId = params.id;

  const { data, isLoading } = useQuery<Product>({
    queryKey: ["product", productId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/product/${productId}`);
      return res.data.data;
    },
    enabled: !!productId,
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!data) return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      <img
        src={data.images[0] || "/placeholder.png"}
        alt={data.title}
        className="rounded-lg w-full h-96 object-cover"
      />
      <div>
        <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
        <p className="text-pink-600 text-xl font-bold mb-4">${data.price.toFixed(2)}</p>
        <p className="mb-6">{data.description}</p>
        <Button>Add to Cart</Button>
      </div>
    </div>
  );
}
