/* eslint-disable @typescript-eslint/no-explicit-any */


// "use client";

// import Image from "next/image";
// import { ProductService } from "@/app/services/product.service";

// export default async function ProductDetail({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const product = await ProductService.getById(params.id);


//   return (
//     <section className="container mx-auto px-4 py-6 md:py-10">
//       <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
//         {/* Image */}
//         <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
//           <Image
//             src={product.image}
//             alt={product.title}
//             fill
//             className="object-cover rounded-xl"
//           />
//         </div>

//         {/* Info */}
//         <div>
//           <h1 className="text-xl md:text-3xl font-bold">{product.title}</h1>

//           <p className="text-pink-600 text-lg md:text-2xl font-semibold mt-2">
//             ৳ {product.price.toLocaleString()}
//           </p>

//           <p className="text-gray-600 mt-4 text-sm md:text-base">
//             {product.description || "No description available"}
//           </p>

//           <button className="mt-6 w-full md:w-auto px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { useState, useEffect } from "react"; 
import Image from "next/image";
import { ProductService } from "@/app/services/product.service";

import { useRouter } from "next/navigation";

export default function ProductDetail({
  params,
}: {
  params: { id: string }; 
}) {
  // const resolvedParams = use(params); 
  const productId = params.id; 

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (productId) {
      ProductService.getById(productId)
        .then((res: any) => {
          setProduct(res.data || res);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [productId]);

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!product) return <div className="p-10 text-center">Product not found!</div>;

  const productImg = product.images && product.images.length > 0 
    ? product.images[0] 
    : "/placeholder.jpg";


    const handleAddToCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  
 
  const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.images?.[0] || "/placeholder.jpg",
      quantity: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  router.push("/cart");
}
  return (
    <section className="container mx-auto px-4 py-6 md:py-10">
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
        {/* Image */}
        <div className="relative w-full aspect-square rounded-xl overflow-hidden border bg-gray-50">
          <Image
            src={productImg}
            alt={product.title}
            fill
            className="object-cover rounded-xl"
            priority
          />
        </div>

        {/* Info */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">{product.title}</h1>

          <p className="text-pink-600 text-xl md:text-3xl font-bold mt-3">
            ৳ {product.price?.toLocaleString()}
          </p>

          <div className="mt-6">
            <h3 className="font-semibold text-gray-700">Description</h3>
            <p className="text-gray-600 mt-2 leading-relaxed">
              {product.description || "No description available for this product."}
            </p>
          </div>
          
          <div className="mt-4">
             <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {product.stock > 0 ? `In Stock: ${product.stock}` : 'Out of Stock'}
             </span>
          </div>

          <button 
          onClick={handleAddToCart}
        disabled={product.stock === 0}
        className="mt-8 w-full md:w-max px-12 py-4 bg-pink-600 text-white rounded-xl hover:bg-pink-700 transition font-bold shadow-lg disabled:bg-gray-400"
       >
      Add to Cart
     </button>
        </div>
      </div>
    </section>
  );
}