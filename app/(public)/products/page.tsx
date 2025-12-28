/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @next/next/no-img-element */


// type Product = {
//   id: string;
//   title: string;
//   price: number;
//   images: string[];
// };

// async function getProducts(): Promise<Product[]> {
//   const res = await fetch("http://localhost:5000/api/product", {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     throw new Error("Failed to fetch products");
//   }

//   const result = await res.json();
//   console.log("API RESULT:", result);

//   return result.data; 
// }

// export default async function ProductsPage() {
//   const products = await getProducts();

//   return (
//     <section className="container mx-auto px-4 py-10">
//       <h1 className="text-3xl font-bold mb-6">All Products</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <div
//             key={product.id}
//             className="border rounded-lg p-4 hover:shadow"
//           >
//             <img
//               src={product.images?.[0] || "/placeholder.png"}
//               alt={product.title}
//               className="h-48 w-full object-cover rounded"
//             />
//             <h3 className="mt-3 font-semibold">{product.title}</h3>
//             <p className="text-primary font-bold">৳ {product.price}</p>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }


import ProductCard from "@/app/product/ProductCard";
import { ProductService } from "@/app/services/product.service";

export default async function ProductsPage() {
  const products = await ProductService.getAll();

  return (
    <section className="container mx-auto px-4 py-6 md:py-10">
      <h1 className="text-xl md:text-3xl font-bold mb-6">
        All Products
      </h1>

      {/* Responsive Grid */}
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
    </section>
  );
}
