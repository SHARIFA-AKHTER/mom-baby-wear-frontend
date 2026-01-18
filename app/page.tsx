
// /* eslint-disable @next/next/no-img-element */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import { Button } from "@/components/ui/button";
// import HeroSlider from "./components/common/HeroSlider";
// import { ProductService } from "@/app/services/product.service";
// import {
//   Loader2,
//   ShoppingBag,
//   ArrowRight,
//   LayoutGrid,
//   Star,
//   ShieldCheck,
//   Truck,
// } from "lucide-react";
// import ProductCard from "./product/ProductCard";
// import Link from "next/link";
// import ContactSection from "./contact/page";

// export default function HomePage() {
//   const [products, setProducts] = useState<any>([]);
//   const [categories, setCategories] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
  

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
//         const [prodRes, catRes] = await Promise.all([
//           ProductService.getAll(),
//           fetch(`${API_URL}/category`).then((res) => res.json()),
//         ]);
//         setProducts(prodRes.data || prodRes);
//         setCategories(catRes.data || []);
//       } catch (err) {
//         console.error("Failed to fetch data", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchData();
//   }, []);

//   return (
//     <main className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950 transition-colors duration-300">
//       {/* 1. Hero Section */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
//         <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg transition-all">
//           <HeroSlider />
//         </div>
//       </section>

//       {/* 2. Quick Features (Trust Badges) - New */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl
//          shadow-sm border border-gray-100 dark:border-gray-800">
//           <div className="flex flex-col items-center text-center gap-2">
//             <Truck className="text-pink-500" size={28} />
//             <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Fast Delivery</p>
//           </div>
//           <div className="flex flex-col items-center text-center gap-2">
//             <ShieldCheck className="text-pink-500" size={28} />
//             <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Secure Payment</p>
//           </div>
//           <div className="flex flex-col items-center text-center gap-2 border-l border-gray-100">
//             <Star className="text-pink-500" size={28} />
//             <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Best Quality</p>
//           </div>
//           <div className="flex flex-col items-center text-center gap-2 border-l border-gray-100">
//             <ShoppingBag className="text-pink-500" size={28} />
//             <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Easy Return</p>
//           </div>
//         </div>
//       </section>

//       {/* 3. Shop By Category (Iconic View) */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="flex items-center justify-between mb-8">
//           <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
//             <LayoutGrid className="text-pink-500" /> Shop Categories
//           </h2>
//           <Link
//             href="/categories"
//             className="text-pink-600 text-sm font-bold hover:underline"
//           >
//             View All
//           </Link>
//         </div>

//         <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide md:grid md:grid-cols-6 md:overflow-visible">
//           {categories.map((cat) => (
//             <Link
//               key={cat.id}
//               href={`/categories/${cat.id}`}
//               className="shrink-0 group flex flex-col items-center gap-3"
//             >
//               <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-pink-100 p-1 group-hover:border-pink-500 transition-all duration-300 shadow-sm">
//                 <img
//                   src={cat.image || "/placeholder.png"}
//                   alt={cat.name}
//                   className="w-full h-full object-cover rounded-full"
//                 />
//               </div>
//               <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-pink-600">
//                 {cat.name}
//               </span>
//             </Link>
//           ))}
//         </div>
//       </section>

//       {/* 4. New Arrivals (Product Grid) */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
//         <div className="flex items-center justify-between mb-10">
//           <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white mb-10">
//             New Arrivals
//           </h2>
//           <Link href="/products">
//             <Button
//               variant="ghost"
//               className="text-pink-600 hover:bg-pink-50 font-bold"
//             >
//               Explore More <ArrowRight className="ml-2" size={18} />
//             </Button>
//           </Link>
//         </div>

//         {loading ? (
//           <div className="flex justify-center py-20">
//             <Loader2 className="animate-spin text-pink-500" size={40} />
//           </div>
//         ) : (
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
//             {(Array.isArray(products) ? products : products?.result || [])
//               .slice(0, 8)
//               .map((product: any) => (
//                 <ProductCard key={product.id} product={product} />
//               ))}
//           </div>
//         )}
//       </section>

//       {/* 5. Banner Section (Promotion) - New */}
//       <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="bg-linear-to-r from-pink-600 to-rose-500 dark:from-pink-800 dark:to-rose-700 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl">
//           <div className="max-w-md space-y-4 text-center md:text-left">
//             <h2 className="text-3xl md:text-5xl font-black">
//               Special Mother-Baby Matching!
//             </h2>
//             <p className="opacity-90">
//               Get up to 20% discount on matching outfits for mom and the little
//               one.
//             </p>
//             <Link href={`/categories/mother-and-baby-gown-set`}>
//               <Button className="bg-white text-pink-600 font-bold hover:bg-gray-100 rounded-full px-10">
//                 Shop Now
//               </Button>
//             </Link>
//           </div>
//           <div className="w-full md:w-1/3">
//             <img
//               src="https://i.pinimg.com/474x/0b/d8/81/0bd881d3583c07af38f2e3bcf91dab1c.jpg"
//               alt="Promo"
//               className="rounded-2xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </section>

//       <section className="mt-10 dark:bg-gray-950">
//         <ContactSection />
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
  Users,
  CheckCircle,
  Send,
} from "lucide-react";
import ProductCard from "./product/ProductCard";
import Link from "next/link";
import ContactSection from "./contact/page";

export default function HomePage() {
  const [products, setProducts] = useState<any>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // ১. ডাটা ফেচ করার জন্য useEffect (সঠিক জায়গায়)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
        const [prodRes, catRes, statRes] = await Promise.all([
          ProductService.getAll(),
          fetch(`${API_URL}/category`).then((res) => res.json()),
          fetch(`${API_URL}/review/public-stats`).then((res) => res.json()),
        ]);

        setProducts(prodRes.data || prodRes);
        setCategories(catRes.data || []);
        setStats(statRes.data || null);
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ২. নিউজলেটার হ্যান্ডেল করার ফাংশন
  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
      const res = await fetch(`${API_URL}/newsletter/subscribe`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newsletterEmail }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Subscribed successfully!");
        setNewsletterEmail("");
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error subscribing:", error);
      alert("Failed to subscribe. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F9FA] dark:bg-gray-950 transition-colors duration-300">
      {/* 1. Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-6">
        <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden shadow-lg transition-all">
          <HeroSlider />
        </div>
      </section>

      {/* 2. Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
          <div className="flex flex-col items-center text-center gap-2">
            <Truck className="text-pink-500" size={28} />
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Fast Delivery</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 border-l border-gray-100">
            <ShieldCheck className="text-pink-500" size={28} />
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Secure Payment</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 border-l border-gray-100">
            <Star className="text-pink-500" size={28} />
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Best Quality</p>
          </div>
          <div className="flex flex-col items-center text-center gap-2 border-l border-gray-100">
            <ShoppingBag className="text-pink-500" size={28} />
            <p className="text-sm font-bold text-gray-800 dark:text-gray-200">Easy Return</p>
          </div>
        </div>
      </section>

      {/* 3. Shop By Category */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-3xl font-black text-gray-900 dark:text-white flex items-center gap-2">
            <LayoutGrid className="text-pink-500" /> Shop Categories
          </h2>
          <Link href="/categories" className="text-pink-600 text-sm font-bold hover:underline">View All</Link>
        </div>
        <div className="flex overflow-x-auto pb-4 gap-6 scrollbar-hide md:grid md:grid-cols-6 md:overflow-visible">
          {categories.map((cat) => (
            <Link key={cat.id} href={`/categories/${cat.id}`} className="shrink-0 group flex flex-col items-center gap-3">
              <div className="w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-pink-100 p-1 group-hover:border-pink-500 transition-all duration-300 shadow-sm overflow-hidden">
                <img src={cat.image || "/placeholder.png"} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-pink-600">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. Statistics Section */}
      {stats && (
        <section className="bg-pink-600 my-10 py-12 text-white shadow-inner">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <Users className="mx-auto opacity-80" size={30} />
              <h3 className="text-3xl font-black">{stats.happyMoms}+</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-pink-100">Happy Moms</p>
            </div>
            <div className="space-y-1 border-l border-pink-500">
              <ShoppingBag className="mx-auto opacity-80" size={30} />
              <h3 className="text-3xl font-black">{stats.productsSold}+</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-pink-100">Items Sold</p>
            </div>
            <div className="space-y-1 border-l border-pink-500">
              <Star className="mx-auto opacity-80" size={30} />
              <h3 className="text-3xl font-black">{stats.totalReviews}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-pink-100">Top Reviews</p>
            </div>
            <div className="space-y-1 border-l border-pink-500">
              <CheckCircle className="mx-auto opacity-80" size={30} />
              <h3 className="text-3xl font-black">{stats.avgRating}</h3>
              <p className="text-xs font-bold uppercase tracking-widest text-pink-100">Avg Rating</p>
            </div>
          </div>
        </section>
      )}

      {/* 5. New Arrivals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white">New Arrivals</h2>
          <Link href="/products">
            <Button variant="ghost" className="text-pink-600 hover:bg-pink-50 font-bold">
              Explore More <ArrowRight className="ml-2" size={18} />
            </Button>
          </Link>
        </div>
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-pink-500" size={40} /></div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
            {(Array.isArray(products) ? products : products?.result || []).slice(0, 8).map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 6. Banner Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-gradient-to-r from-pink-600 to-rose-500 rounded-3xl p-8 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8 text-white shadow-xl">
          <div className="max-w-md space-y-4 text-center md:text-left">
            <h2 className="text-3xl md:text-5xl font-black">Special Mother-Baby Matching!</h2>
            <p className="opacity-90">Get up to 20% discount on matching outfits for mom and the little one.</p>
            <Link href={`/categories/mother-and-baby-gown-set`}>
              <Button className="bg-white text-pink-600 font-bold hover:bg-gray-100 rounded-full px-10">Shop Now</Button>
            </Link>
          </div>
          <div className="w-full md:w-1/3">
            <img src="https://i.pinimg.com/474x/0b/d8/81/0bd881d3583c07af38f2e3bcf91dab1c.jpg" alt="Promo" className="rounded-2xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* 7. Newsletter Section */}
      <section className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="bg-white dark:bg-gray-900 border border-pink-100 dark:border-gray-800 rounded-[2.5rem] p-10 md:p-20 shadow-sm">
          <h2 className="text-3xl md:text-5xl font-black mb-4">Join Our Community</h2>
          <p className="text-gray-500 mb-8 max-w-lg mx-auto">
            Get early access to sales, new arrivals and baby care tips directly to your inbox.
          </p>
          <form onSubmit={handleNewsletter} className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full bg-gray-100 dark:bg-gray-800 border-none outline-none focus:ring-2 focus:ring-pink-500 text-black dark:text-white"
              required
            />
            <Button
              type="submit"
              disabled={submitting}
              className="bg-pink-600 hover:bg-pink-700 text-white rounded-full px-8 py-4 font-bold flex items-center justify-center gap-2"
            >
              {submitting ? "Subscribing..." : "Subscribe"}
              {!submitting && <Send size={18} />}
            </Button>
          </form>
        </div>
      </section>

      {/* 8. Contact Section */}
      <section className="mt-10 dark:bg-gray-950">
        <ContactSection />
      </section>
    </main>
  );
}