// /* eslint-disable react/no-unescaped-entities */
// /* eslint-disable @typescript-eslint/no-explicit-any */


// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import HeroSlider from "./components/common/HeroSlider";
// import { ProductService } from "@/app/services/product.service";
// import { Loader2, Sparkles } from "lucide-react";
// import ProductCard from "./product/ProductCard";
// import Link from "next/link";

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
//     <main className="min-h-screen bg-gray-50 pb-20">
//       <section className="max-w-7xl mx-auto px-4 py-6 md:py-12 text-center">
//         {/* 1. Search Bar */}
//         {/* <div className="w-full max-w-[95%] md:max-w-2xl lg:max-w-3xl mx-auto mb-10">
//           <div className="relative group">
//             <input
//               type="text"
//               placeholder="Search for baby clothes..."
//               className="w-full p-4 md:p-5 border border-pink-100 rounded-full outline-none focus:ring-4 focus:ring-pink-100 shadow-sm transition-all"
//             />
//             <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold transition-colors">
//               Search
//             </button>
//           </div>
//         </div> */}

//         {/* 2. Title Section */}
//         <div className="space-y-4 mb-12">
//           {/* <div className="flex items-center justify-center gap-2 text-pink-500 font-bold uppercase tracking-widest text-xs">
//             <Sparkles size={16} /> Best for your little ones
//           </div> */}
//           {/* <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight">
//             Mom & <span className="text-pink-600">Baby</span> Wear
//           </h1>
//           <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto px-2 leading-relaxed">
//             Shop premium quality clothing and essentials. Comfort meets style
//             for your babies.
//           </p> */}
//         </div>

//         {/* 3. Slider Section */}
//         <div className="w-full rounded-3xl overflow-hidden shadow-2xl mb-16">
//           <HeroSlider />
//         </div>

//         {/* 4. Product Section Header */}
//         <div className="flex items-end justify-between mb-8 px-2">
//           <div className="text-left">
//             <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
//               New Arrivals
//             </h2>
//             <div className="h-1 w-20 bg-pink-500 mt-2 rounded-full"></div>
//           </div>
//           <Link href="/products">
//             <Button
//               variant="ghost"
//               className="text-pink-600 font-bold hover:text-pink-700"
//             >
//               View All
//             </Button>
//           </Link>
//         </div>

//         {/* 5. Product Grid */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <Loader2 className="animate-spin text-pink-500 mb-2" size={40} />
//             <p className="text-gray-400">Loading products...</p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
//             {products.length > 0 ? (
//               products
//                 .slice(0, 6)
//                 .map((product) => (
//                   <ProductCard key={product.id} product={product} />
//                 ))
//             ) : (
//               <p className="col-span-full py-10 text-gray-400">
//                 No products found!
//               </p>
//             )}
//           </div>
//         )}
//       </section>
//     </main>
//   );
// }

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import HeroSlider from "./components/common/HeroSlider";
// import { ProductService } from "@/app/services/product.service";
// import { Loader2, ShoppingBag } from "lucide-react";
// import ProductCard from "./product/ProductCard";
// import Link from "next/link";

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
//     <main className="min-h-screen bg-gray-50/50 pb-20">
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        
//         {/* 1. Hero/Slider Section */}
//         <div className="w-full rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lg mb-10 md:mb-16">
//           <HeroSlider />
//         </div>

//         {/* 2. Product Section Header */}
//         <div className="flex flex-row items-center justify-between mb-8 border-b border-gray-200 pb-4">
//           <div className="text-left">
//             <h2 className="text-xl md:text-3xl font-extrabold text-gray-900 flex items-center gap-2">
//               <ShoppingBag className="text-pink-500 hidden sm:block" size={28} />
//               New Arrivals
//             </h2>
//             <p className="text-gray-500 text-xs md:text-sm font-medium mt-1">
//               Top picks for your little ones
//             </p>
//           </div>
          
//           <Link href="/products">
//             <Button
//               variant="outline"
//               className="border-pink-200 text-pink-600 hover:bg-pink-50 hover:text-pink-700 font-bold rounded-full px-4 md:px-6 transition-all"
//             >
//               View All
//             </Button>
//           </Link>
//         </div>

//         {/* 3. Product Grid */}
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-32">
//             <Loader2 className="animate-spin text-pink-500 mb-4" size={48} />
//             <p className="text-gray-500 font-medium animate-pulse">Loading amazing products...</p>
//           </div>
//         ) : (
//           <>
//             {products.length > 0 ? (
//               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
//                 {products
//                   .slice(0, 6) 
//                   .map((product) => (
//                     <div key={product.id || product._id} className="transition-transform duration-300 hover:-translate-y-1">
//                       <ProductCard product={product} />
//                     </div>
//                   ))}
//               </div>
//             ) : (
//               <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
//                 <p className="text-gray-400 text-lg">No products found!</p>
//               </div>
//             )}
//           </>
//         )}

//       </section>
//     </main>
//   );
// }

/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import HeroSlider from "./components/common/HeroSlider";
import { ProductService } from "@/app/services/product.service";
import { Loader2, ShoppingBag } from "lucide-react";
import ProductCard from "./product/ProductCard";
import Link from "next/link";

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ProductService.getAll()
      .then((res: any) => {
        setProducts(res.data || res);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setLoading(false);
      });
  }, []);

  return (
    <main className="min-h-screen bg-white pb-20">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
        
        {/* 1. Hero/Slider Section */}
        <div className="w-full rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-xl mb-12 border border-gray-100">
          <HeroSlider />
        </div>

        {/* 2. Product Section Header */}
        <div className="flex items-center justify-between mb-10">
          <div className="text-left">
            <h2 className="text-2xl md:text-4xl font-black text-gray-900 flex items-center gap-3">
              <ShoppingBag className="text-pink-500" size={32} />
              New Arrivals
            </h2>
            <div className="h-1.5 w-16 bg-pink-500 mt-2 rounded-full"></div>
          </div>
          
          <Link href="/products">
            <Button variant="ghost" className="text-pink-600 font-bold hover:text-pink-700 hover:bg-pink-50 rounded-full px-6 transition-colors">
              View All
            </Button>
          </Link>
        </div>

        {/* 3. Product Grid (Responsive Configured) */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="animate-spin text-pink-500 mb-4" size={50} />
            <p className="text-gray-400 font-medium tracking-wide">Fetching Best Products...</p>
          </div>
        ) : (
         
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {products.length > 0 ? (
              products.slice(0, 6).map((product) => (
                <div key={product.id || product._id} className="group transition-all duration-300">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
                <p className="text-gray-400">No products found!</p>
              </div>
            )}
          </div>
        )}

      </section>
    </main>
  );
}