/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 
import { Heart, Loader2 } from "lucide-react"; 
import { useWishlist } from "@/app/hooks/useWishlist"; 

export interface Product {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  stock?: number;
  images: string[];
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  const router = useRouter(); 
  

  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();


  const items = Array.isArray(wishlistItems) ? wishlistItems : [];
  
  
  const isFavorite = items.some((item: any) => {
    const itemId = typeof item === 'string' ? item : item.id;
    return itemId === product.id;
  });

  const isPending = addToWishlist.isPending || removeFromWishlist.isPending;

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    if (isFavorite) {
      removeFromWishlist.mutate(product.id);
    } else {
      addToWishlist.mutate(product.id);
    }
  };

  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "https://via.placeholder.com/300"; 

  return (
    <div className="group rounded-xl border bg-white shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden relative">
      
      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        disabled={isPending}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all group/heart disabled:opacity-70"
      >
        {isPending ? (
          <Loader2 size={18} className="animate-spin text-pink-600" />
        ) : (
          <Heart 
            size={18} 
            className={`transition-colors ${isFavorite ? "fill-pink-600 text-pink-600" : "text-gray-400 group-hover/heart:text-pink-600"}`} 
          />
        )}
      </button>

      {/* Image Container */}
      <div 
        className="relative w-full h-48 sm:h-56 cursor-pointer"
        onClick={() => router.push(`/products/${product.id}`)} 
      >
        <Image
          src={mainImage} 
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
          {product.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
          {product.description || "No description available"}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-pink-600 font-bold text-sm sm:text-base">
            ৳ {product.price.toLocaleString()}
          </span>

          <Button
            size="sm"
            disabled={product.stock === 0}
            onClick={() => router.push(`/products/${product.id}`)} 
            className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-5"
          >
            {product.stock === 0 ? "Out of Stock" : "View"}
          </Button>
        </div>
      </div>
    </div>
  );
}