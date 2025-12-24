"use client";

import ProductCard from "@/app/product/ProductCard";
import axiosInstance from "@/app/utils/axiosInstance";
import { useQuery } from "@tanstack/react-query";


interface Product {
  id: string;
  title: string;
  price: number;
  images: string[];
}

export default function ProductsPage() {
  const { data, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await axiosInstance.get("/product/create");
      return res.data.data;
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {data?.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  );
}
