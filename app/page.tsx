// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import HeroSlider from "./components/common/HeroSlider";
// import { ProductService } from "@/app/services/product.service";
// import { Loader2, ShoppingBag, ArrowRight } from "lucide-react";
// import ProductCard from "./product/ProductCard";
// import Link from "next/link";
// import ContactSection from "./contact/page";

// export default function HomePage() {
//   const [products, setProducts] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     ProductService.getAll()
//       .then((res: any) => {
//         setProducts(res.data || res);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch products", err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <main className="min-h-screen bg-[#FDFDFD]">
//       {/* 1. Hero Section - Full width on mobile, constrained on desktop */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-10">
//         <div className="w-full rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-12 md:mb-20 border border-gray-100 transition-all duration-500">
//           <HeroSlider />
//         </div>
//       </section>

//       {/* 2. Product Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
//           <div className="text-left">
//             <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 flex items-center gap-2 md:gap-4">
//               <ShoppingBag className="text-pink-500 w-8 h-8 md:w-12 md:h-12" />
//               New Arrivals
//             </h2>
//             <div className="h-1.5 w-16 md:w-24 bg-pink-500 mt-2 rounded-full"></div>
//           </div>

//           <Link href="/products" className="w-full sm:w-auto">
//             <Button
//               variant="outline"
//               className="w-full sm:w-auto border-pink-200 text-pink-600 font-bold hover:bg-pink-50 rounded-full px-8 py-6 transition-all group"
//             >
//               View All Products
//               <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
//             </Button>
//           </Link>
//         </div>

//         {/* 3. Product Grid (Responsive Configured) */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-24 md:py-32">
//             <Loader2 className="animate-spin text-pink-500 mb-4" size={50} />
//             <p className="text-gray-400 font-semibold tracking-wide">Fetching Best Products...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
//             {products.length > 0 ? (
//               products.slice(0, 8).map((product) => (
//                 <div key={product.id || product._id} className="hover:-translate-y-2 transition-transform duration-300">
//                   <ProductCard product={product} />
//                 </div>
//               ))
//             ) : (
//               <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
//                 <div className="inline-block p-6 bg-white rounded-full mb-4 shadow-sm">
//                    <ShoppingBag className="text-gray-300" size={40} />
//                 </div>
//                 <p className="text-gray-500 font-medium text-lg">Oops! No products found at the moment.</p>
//               </div>
//             )}
//           </div>
//         )}
//       </section>

//       {/* 4. Contact/Footer Section */}
//       <section className="bg-white border-t border-gray-50">
//          <ContactSection />
//       </section>
//     </main>
//   );
// }

/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import HeroSlider from "./components/common/HeroSlider";
import { ProductService } from "@/app/services/product.service";
import {
  Loader2,
  ShoppingBag,
  ArrowRight,
  LayoutGrid,
  Star,
  ShieldCheck,
  Truck,
} from "lucide-react";
import ProductCard from "./product/ProductCard";
import Link from "next/link";
import ContactSection from "./contact/page";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const [prodRes, catRes] = await Promise.all([
          ProductService.getAll(),
          fetch(`${API_URL}/category`).then((res) => res.json()),
        ]);
        setProducts(prodRes.data || prodRes);
        setCategories(catRes.data || []);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <main className="min-h-screen bg-[#F8F9FA]">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
        <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg transition-all">
          <HeroSlider />
        </div>
      </section>

      {/* 2. Quick Features (Trust Badges) - New */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col items-center text-center gap-2">
            <Truck className="text-pink-500" size={28} />
            <p className="text-sm font-bold text-gray-800">Fast Delivery</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2">
            <ShieldCheck className="text-pink-500" size={28} />
            <p className="text-sm font-bold text-gray-800">Secure Payment</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 border-l border-gray-100">
            <Star className="text-pink-500" size={28} />
            <p className="text-sm font-bold text-gray-800">Best Quality</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 border-l border-gray-100">
            <ShoppingBag className="text-pink-500" size={28} />
            <p className="text-sm font-bold text-gray-800">Easy Return</p>
          </div>
        </div>
      </section>

      {/* 3. Shop By Category (Iconic View) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 flex items-center gap-2">
            <LayoutGrid className="text-pink-500" /> Shop Categories
          </h2>
          <Link
            href="/categories"
            className="text-pink-600 text-sm font-bold hover:underline"
          >
            View All
          </Link>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide md:grid md:grid-cols-6 md:overflow-visible">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="shrink-0 group flex flex-col items-center gap-3"
            >
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-pink-100 p-1 group-hover:border-pink-500 transition-all duration-300 shadow-sm">
                <img
                  src={cat.image || "/placeholder.png"}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-sm font-bold text-gray-700 group-hover:text-pink-600">
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. New Arrivals (Product Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900">
            New Arrivals
          </h2>
          <Link href="/products">
            <Button
              variant="ghost"
              className="text-pink-600 hover:bg-pink-50 font-bold"
            >
              Explore More <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-pink-500" size={40} />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 5. Banner Section (Promotion) - New */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-linear-to-r from-pink-500 to-rose-400 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white">
          <div className="max-w-md space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black">
              Special Mother-Baby Matching!
            </h2>
            <p className="opacity-90">
              Get up to 20% discount on matching outfits for mom and the little
              one.
            </p>
            <Link href={`/categories/mother-and-baby-gown-set`}>
              <Button className="bg-white text-pink-600 font-bold hover:bg-gray-100 rounded-full px-10">
                Shop Now
              </Button>
            </Link>
          </div>
          <div className="w-full md:w-1/3">
            <img
              src="https://i.pinimg.com/474x/0b/d8/81/0bd881d3583c07af38f2e3bcf91dab1c.jpg"
              alt="Promo"
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="mt-10">
        <ContactSection />
      </section>
    </main>
  );
}
