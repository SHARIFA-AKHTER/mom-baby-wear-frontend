/* eslint-disable @next/next/no-async-client-component */
/* eslint-disable @next/next/no-img-element */

// import { notFound } from "next/navigation";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   description: string;
// };

// async function getProduct(id: string): Promise<Product> {
//   const res = await fetch(`http://localhost:5000/api/products/${id}`, {
//     cache: "no-store",
//   });

//   if (!res.ok) {
//     notFound();
//   }

//   return res.json();
// }

// export default async function ProductDetailsPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const product = await getProduct(params.id);

//   return (
//     <section className="container mx-auto px-4 py-10">
//       <div className="grid md:grid-cols-2 gap-8">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="rounded-lg"
//         />

//         <div>
//           <h1 className="text-3xl font-bold">{product.name}</h1>
//           <p className="text-xl text-primary font-semibold mt-2">
//             ৳ {product.price}
//           </p>

//           <p className="mt-4 text-gray-600">{product.description}</p>

//           <button className="mt-6 px-6 py-2 bg-primary text-white rounded-lg">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import Image from "next/image";
import { ProductService } from "@/app/services/product.service";

export default async function ProductDetail({
  params,
}: {
  params: { id: string };
}) {
  const product = await ProductService.getById(params.id);

  // Public folder fallback image


  return (
    <section className="container mx-auto px-4 py-6 md:py-10">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
          <Image
            src={product.image}
            alt={product.title}
            fill
            className="object-cover rounded-xl"
          />
        </div>

        {/* Info */}
        <div>
          <h1 className="text-xl md:text-3xl font-bold">{product.title}</h1>

          <p className="text-pink-600 text-lg md:text-2xl font-semibold mt-2">
            ৳ {product.price.toLocaleString()}
          </p>

          <p className="text-gray-600 mt-4 text-sm md:text-base">
            {product.description || "No description available"}
          </p>

          <button className="mt-6 w-full md:w-auto px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
