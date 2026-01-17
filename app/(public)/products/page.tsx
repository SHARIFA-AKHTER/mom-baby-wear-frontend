/* eslint-disable @typescript-eslint/no-explicit-any */


// import ProductCard from "@/app/product/ProductCard";
// import { ProductService } from "@/app/services/product.service";

// export default async function ProductsPage() {
//   let products = [];

//   try {

//     products = await ProductService.getAll();
//   } catch (error) {
  
//     console.error("Error fetching products during build:", error);
//   }

//   return (
//     <section className="container mx-auto px-4 py-6 md:py-10">
//       <h1 className="text-xl md:text-3xl font-bold mb-6">
//         All Products
//       </h1>

//       {products && products.length > 0 ? (
//         <div
//           className="
//             grid gap-4
//             grid-cols-1
//             sm:grid-cols-2
//             lg:grid-cols-3
//             xl:grid-cols-4
//           "
//         >
//           {products.map((product: any) => (
//             <ProductCard key={product.id} product={product} />
//           ))}
//         </div>
//       ) : (
//         <div className="text-center py-20 bg-gray-50 rounded-xl">
//           <p className="text-gray-500 text-lg">No products found at the moment.</p>
//         </div>
//       )}
//     </section>
//   );
// }

import ProductCard from "@/app/product/ProductCard";
import { ProductService } from "@/app/services/product.service";

export default async function ProductsPage() {
  let products = [];

  try {
    const response = await ProductService.getAll();
    

    const rawData = response?.data || response;
    
   
    products = Array.isArray(rawData) 
      ? rawData 
      : rawData?.result || rawData?.data || [];

  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <section className="container mx-auto px-4 py-6 md:py-10 min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl md:text-3xl font-bold text-gray-800 border-l-4 border-pink-500 pl-4">
          All Products
        </h1>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Total: {products.length}
        </span>
      </div>

      {products.length > 0 ? (
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {products.map((product: any) => (
            <ProductCard key={product.id || product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <div className="text-5xl mb-4">📦</div>
          <p className="text-gray-500 text-lg font-medium">No products found at the moment.</p>
          <p className="text-gray-400 text-sm">Please check back later or refresh the page.</p>
        </div>
      )}
    </section>
  );
}