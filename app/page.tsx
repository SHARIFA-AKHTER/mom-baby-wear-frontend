// import { Button } from "@/components/ui/button";
// import HeroSlider from "./components/common/HeroSlider";



// export default function HomePage() {
//   return (
//     <main>
//       <section className="max-w-7xl mx-auto px-4 py-10 text-center">

//            <div className="max-w-md mx-auto mb-8">
//            <input 
//              type="text" 
//              placeholder="Search for baby clothes..." 
//              className="w-full p-3 border border-pink-200 rounded-full outline-none focus:ring-2 focus:ring-pink-400"
//            />
//         </div> 

//         {/* Title and Description */}
//         <h1 className="text-4xl font-bold mb-4 text-pink-600">
//           Mom & Baby Wear
//         </h1>
//         <p className="text-gray-600 max-w-xl mx-auto mb-6">
//           Shop premium quality clothing and essentials for moms and babies.
//         </p>

       
      
//         {/* 2. Slider / Image Slice */}
//         <HeroSlider />

//         {/* 3. Call to Action Button */}
//         <div className="mt-8">
//           <Button variant="default" size="lg">
//             Shop Now
//           </Button>
//         </div>
//       </section>
//     </main>
//   );
// }

import { Button } from "@/components/ui/button";
import HeroSlider from "./components/common/HeroSlider";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="max-w-7xl mx-auto px-4 py-6 md:py-12 text-center">
        
        {/* 1. Search Bar - Responsive Width */}
        <div className="w-full max-w-[95%] md:max-w-2xl lg:max-w-3xl mx-auto mb-8">
           <div className="relative">
              <input 
                type="text" 
                placeholder="Search for baby clothes..." 
                className="w-full p-3 md:p-4 border border-pink-200 rounded-full outline-none focus:ring-2 focus:ring-pink-400 shadow-sm"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 bg-pink-500 text-white px-4 py-1.5 md:py-2 rounded-full text-sm">
                Search
              </button>
           </div>
        </div> 

        {/* 2. Title and Description - Responsive Text Size */}
        <div className="space-y-3 mb-8">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-pink-600 tracking-tight">
            Mom & Baby Wear
          </h1>
          <p className="text-gray-500 text-sm md:text-lg max-w-2xl mx-auto px-2">
            Shop premium quality clothing and essentials for moms and babies. 
            Comfort meets style for your little ones.
          </p>
        </div>

        {/* 3. Slider Section */}
        <div className="w-full overflow-hidden">
          <HeroSlider />
        </div>

        {/* 4. Call to Action Button */}
        <div className="mt-8">
          <Button variant="default" size="lg" className="px-10 py-6 text-lg rounded-full hover:scale-105 transition-transform">
            Shop Now
          </Button>
        </div>

      </section>
    </main>
  );
}