
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
import { Loader2, ShoppingBag, ArrowRight, LayoutGrid } from "lucide-react";
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
        setLoading(true);
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
    <main className="min-h-screen bg-[#FDFDFD]">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-10">
        <div className="w-full rounded-2xl md:rounded-[3rem] overflow-hidden shadow-2xl mb-12 md:mb-16 border border-gray-100 transition-all duration-500">
          <HeroSlider />
        </div>
      </section>

      {/* 2. Shop By Category Section - NEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div className="text-left">
            <h2 className="text-2xl md:text-3xl font-black text-gray-900 flex items-center gap-3">
              <LayoutGrid className="text-pink-500 w-6 h-6 md:w-8 md:h-8" />
              Shop By Category
            </h2>
            <div className="h-1 w-12 bg-pink-500 mt-1 rounded-full"></div>
          </div>
          <Link href="/categories" className="text-pink-600 font-bold hover:underline flex items-center gap-1 text-sm md:text-base">
            See All <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.slice(0, 6).map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.id}`}
              className="group flex flex-col items-center p-4 bg-white border border-gray-50 rounded-2xl hover:border-pink-200 hover:shadow-xl transition-all duration-300"
            >
              <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden bg-pink-50 mb-3 border-2 border-transparent group-hover:border-pink-500 transition-all">
                <img
                  src={cat.image || "https://via.placeholder.com/150"}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <h3 className="font-bold text-gray-800 group-hover:text-pink-600 text-sm md:text-base text-center line-clamp-1">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals Product Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
          <div className="text-left">
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-gray-900 flex items-center gap-2 md:gap-4">
              <ShoppingBag className="text-pink-500 w-8 h-8 md:w-12 md:h-12" />
              New Arrivals
            </h2>
            <div className="h-1.5 w-16 md:w-24 bg-pink-500 mt-2 rounded-full"></div>
          </div>
          
          <Link href="/products" className="w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto border-pink-200 text-pink-600 font-bold hover:bg-pink-50 rounded-full px-8 py-6 transition-all group"
            >
              View All Products
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 md:py-32">
            <Loader2 className="animate-spin text-pink-500 mb-4" size={50} />
            <p className="text-gray-400 font-semibold tracking-wide">Fetching Best Products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8 lg:gap-10">
            {products.length > 0 ? (
              products.slice(0, 8).map((product) => (
                <div key={product.id || product._id} className="hover:-translate-y-2 transition-transform duration-300">
                  <ProductCard product={product} />
                </div>
              ))
            ) : (
              <div className="col-span-full py-20 text-center bg-gray-50 rounded-[2rem] border-2 border-dashed border-gray-200">
                <div className="inline-block p-6 bg-white rounded-full mb-4 shadow-sm">
                   <ShoppingBag className="text-gray-300" size={40} />
                </div>
                <p className="text-gray-500 font-medium text-lg">Oops! No products found at the moment.</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* 4. Contact/Footer Section */}
      <section className="bg-white border-t border-gray-50">
         <ContactSection />
      </section>
    </main>
  );
}