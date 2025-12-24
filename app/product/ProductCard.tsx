/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  images: string[];
}

export default function ProductCard({ id, title, price, images }: ProductCardProps) {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col">
      <Link href={`/products/${id}`}>
        <img
          src={images[0] || "/placeholder.png"}
          alt={title}
          className="h-48 w-full object-cover rounded-md mb-4"
        />
      </Link>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-pink-600 font-bold mb-4">${price.toFixed(2)}</p>
      <Link href={`/products/${id}`}>
        <Button className="w-full">View Details</Button>
      </Link>
    </div>
  );
}
