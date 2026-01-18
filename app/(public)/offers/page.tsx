/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingBag, Tag, Loader2, Gift, Percent, Sparkles } from "lucide-react";
import Link from "next/link";
import { ProductService } from "@/app/services/product.service";

export default function OffersPage() {
  const [discountedProducts, setDiscountedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndFilterOffers = async () => {
      try {
        const prodRes = await ProductService.getAll();
        const allProducts = prodRes.data || prodRes?.result || prodRes || [];
        
        const filtered = allProducts.filter((p: any) => p.discountPrice && p.discountPrice < p.price);
        
        setDiscountedProducts(filtered.slice(0, 6));
      } catch (err) {
        console.error("Failed to load products for offers", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterOffers();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-gray-950">
        <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
        <p className="font-black uppercase tracking-widest text-[10px] text-gray-400">Searching Best Deals...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDFDFF] dark:bg-gray-950 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        
        {/* Header Section - Styled like About Hero */}
        <div className="text-center mb-16 space-y-4">
          <div className="flex items-center justify-center gap-2 text-pink-600 font-black text-[10px] uppercase tracking-[0.4em]">
            <Sparkles size={14} /> Limited Time Offers
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
            Care More <span className="text-pink-600">Save More</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 font-medium max-w-lg mx-auto text-sm md:text-base">
            Exclusive discounts on mother and baby essentials. Quality meets affordability in every stitch.
          </p>
        </div>

        {/* Grid Section */}
        {discountedProducts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {discountedProducts.map((product) => {
              const discountPercentage = Math.round(
                ((product.price - product.discountPrice) / product.price) * 100
              );

              return (
                <Card 
                  key={product.id || product._id} 
                  className="group border-none shadow-xl shadow-pink-100/50 dark:shadow-none bg-white dark:bg-gray-900 rounded-[2.5rem] overflow-hidden hover:scale-[1.01] transition-all duration-500"
                >
                  <CardContent className="p-0 flex flex-col sm:flex-row h-full">
                    {/* Product Image Side */}
                    <div className="w-full sm:w-2/5 relative h-64 sm:h-auto overflow-hidden">
                      <img 
                        src={product.images?.[0] || product.image || "/placeholder.png"} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-pink-600 text-white font-black px-3 py-1 rounded-full uppercase text-[10px] tracking-wider animate-pulse border-none">
                          <Percent size={10} className="mr-1 inline" /> {discountPercentage}% OFF
                        </Badge>
                      </div>
                    </div>

                    {/* Content Side */}
                    <div className="flex-1 p-8 flex flex-col justify-between space-y-6">
                      <div className="space-y-3">
                        <h2 className="text-xl md:text-2xl font-black text-gray-800 dark:text-white uppercase tracking-tighter leading-tight line-clamp-2">
                          {product.name}
                        </h2>
                        <div className="flex items-center gap-3">
                           <span className="text-2xl font-black text-pink-600">৳{product.discountPrice}</span>
                           <span className="text-sm font-bold text-gray-400 line-through">৳{product.price}</span>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="inline-flex items-center gap-2 bg-pink-50 dark:bg-pink-900/20 px-4 py-2 rounded-full border border-pink-100 dark:border-pink-900/40">
                           <Tag size={12} className="text-pink-600" />
                           <span className="text-[10px] font-black text-pink-600 uppercase tracking-widest">
                             Limited Stock Offer
                           </span>
                        </div>

                        <Link href={`/products/${product.id || product._id}`} className="block">
                          <Button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-black uppercase tracking-widest text-[10px] py-6 rounded-2xl shadow-lg shadow-pink-200 dark:shadow-none transition-all active:scale-95">
                            <ShoppingBag className="mr-2" size={16} /> Grab Deal Now
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-pink-50 dark:bg-gray-900 rounded-[3rem] border-2 border-dashed border-pink-200 dark:border-pink-900">
            <Gift className="mx-auto text-pink-200 mb-4" size={64} />
            <h3 className="text-xl font-black text-pink-300 uppercase tracking-tighter">No active offers today</h3>
            <Link href="/products" className="text-pink-600 font-bold underline mt-4 inline-block">Explore All Products</Link>
          </div>
        )}
      </div>
    </div>
  );
}