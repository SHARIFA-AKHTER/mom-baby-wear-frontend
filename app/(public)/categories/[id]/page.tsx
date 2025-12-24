"use client";

import ProductCard from "@/app/product/ProductCard";
import axiosInstance from "@/app/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "next/navigation";

interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["category", slug],
    queryFn: async () => {
      const res = await axiosInstance.get(`/categories/${slug}`);
      return res.data.data.products;
    },
    enabled: !!slug,
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;
  if (!data || data.length === 0) return <div className="text-center py-20">No products found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
