/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Heart } from "lucide-react";
import { useWishlist } from "@/app/hooks/useWishlist";
import { Button } from "@/components/ui/button";

export default function WishlistPage() {
  const { wishlistItems, isLoading, removeFromWishlist } = useWishlist();

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto p-10 text-center animate-pulse">
        <div className="flex justify-center mb-4">
           <div className="h-10 w-48 bg-gray-200 rounded"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }


  const items = Array.isArray(wishlistItems) ? wishlistItems : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold flex items-center gap-2 mb-8">
        <Heart className="text-pink-600 fill-pink-600" /> My Wishlist
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="flex justify-center mb-4">
            <Heart size={48} className="text-gray-300" />
          </div>
          <p className="text-gray-500 mb-6 text-lg">Your wishlist is empty!</p>
          <Link href="/products">
            <Button className="bg-pink-600 hover:bg-pink-700 rounded-full px-8 h-12">
              Start Shopping
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((product: any) => (
            <div 
              key={product.id} 
              className="group bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              {/* Product Image */}
              <div className="relative h-72 overflow-hidden bg-gray-50">
                <Image
                  src={product.images?.[0] || "/placeholder.jpg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <button 
                  onClick={() => removeFromWishlist.mutate(product.id)}
                  className="absolute top-3 right-3 p-2.5 bg-white/90 backdrop-blur-md rounded-full text-red-500 hover:bg-red-500 hover:text-white shadow-sm transition-all z-10"
                  disabled={removeFromWishlist.isPending}
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {/* Product Details */}
              <div className="p-5">
                
                <h3 className="font-bold text-gray-800 text-lg truncate mb-1">
                  {product.name}
                </h3>
                <h3 className="font-bold text-gray-800 text-lg truncate mb-1">
                  {product.title} 
                </h3>
                <p className="text-pink-600 font-extrabold text-xl">
                  ৳{product.price}
                </p>
                
                <div className="mt-5 flex gap-2">
                  <Link href={`/products/${product.id}`} className="flex-1">
                    <Button variant="outline" className="w-full rounded-xl border-gray-200 hover:bg-gray-50">
                      Details
                    </Button>
                  </Link>
                  <Button className="bg-gray-900 hover:bg-black text-white px-4 rounded-xl">
                    <ShoppingBag size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}