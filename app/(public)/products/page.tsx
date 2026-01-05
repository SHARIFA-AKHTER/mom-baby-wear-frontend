/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @next/next/no-img-element */


// import ProductCard from "@/app/product/ProductCard";
// import { ProductService } from "@/app/services/product.service";

// export default async function ProductsPage() {
//   const products = await ProductService.getAll();

//   return (
//     <section className="container mx-auto px-4 py-6 md:py-10">
//       <h1 className="text-xl md:text-3xl font-bold mb-6">
//         All Products
//       </h1>

//       {/* Responsive Grid */}
//       <div
//         className="
//           grid gap-4
//           grid-cols-1
//           sm:grid-cols-2
//           lg:grid-cols-3
//           xl:grid-cols-4
//         "
//       >
//         {products.map((product: any) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </section>
//   );
// }

import ProductCard from "@/app/product/ProductCard";
import { ProductService } from "@/app/services/product.service";

export default async function ProductsPage() {
  let products = [];

  try {

    products = await ProductService.getAll();
  } catch (error) {
  
    console.error("Error fetching products during build:", error);
  }

  return (
    <section className="container mx-auto px-4 py-6 md:py-10">
      <h1 className="text-xl md:text-3xl font-bold mb-6">
        All Products
      </h1>

      {products && products.length > 0 ? (
        <div
          className="
            grid gap-4
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-xl">
          <p className="text-gray-500 text-lg">No products found at the moment.</p>
        </div>
      )}
    </section>
  );
}