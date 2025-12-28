/* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export interface Product {
//   id: string;
//   title: string;
//   description?: string | null;
//   price: number;
//   stock: number;
//   images: string[];
// }

// interface Props {
//   product: Product;
// }

// export default function ProductCard({ product }: Props) {
//   const image =
//     product.images?.length > 0
//       ? product.images[0]
//       : "/placeholder-product.png";

//   return (
//     <div className="group rounded-xl border bg-white shadow-sm hover:shadow-md transition overflow-hidden flex flex-col">
//       {/* Image */}
//       <Link href={`/products/${product.id}`} className="relative w-full aspect-square">
//         <Image
//           src={image}
//           alt={product.title}
//           fill
//           className="object-cover group-hover:scale-105 transition-transform duration-300"
//           sizes="(max-width: 640px) 100vw,
//                  (max-width: 1024px) 50vw,
//                  33vw"
//         />
//       </Link>

//       {/* Content */}
//       <div className="flex flex-col flex-1 p-4">
//         <h3 className="font-semibold text-gray-900 line-clamp-1">
//           {product.title}
//         </h3>

//         <p className="text-sm text-gray-500 line-clamp-2 mt-1">
//           {product.description || "No description available"}
//         </p>

//         <div className="mt-auto pt-4 flex items-center justify-between">
//           <span className="text-lg font-bold text-pink-600">
//             ৳ {product.price.toLocaleString()}
//           </span>

//           <Button
//             size="sm"
//             disabled={product.stock === 0}
//           >
//             {product.stock === 0 ? "Out of Stock" : "View"}
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  title: string;
  description?: string | null;
  price: number;
  stock?: number;
  images: string[]; 
}

interface Props {
  product: Product;
}

export default function ProductCard({ product }: Props) {
  

  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : "/media.istockphoto.com";

  return (
    <div className="group rounded-xl border bg-white shadow-sm hover:shadow-lg transition flex flex-col overflow-hidden">
      <div className="relative w-full h-48 sm:h-56">
        <Image
          src={mainImage} 
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content */}
      <div className="flex flex-col flex-1 p-3 sm:p-4">
        <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
          {product.title}
        </h3>

        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mt-1">
          {product.description || "No description available"}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between">
          <span className="text-pink-600 font-bold text-sm sm:text-base">
            ৳ {product.price.toLocaleString()}
          </span>

          <Button
            size="sm"
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? "Out of Stock" : "View"}
          </Button>
        </div>
      </div>
    </div>
  );
}