// /* eslint-disable @next/next/no-img-element */

// import Link from "next/link";

// type Product = {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
// };

// async function getCategoryProducts(id: string): Promise<Product[]> {
//   const res = await fetch(
//     `http://localhost:5000/api/category/${id}/product`,
//     { cache: "no-store" }
//   );

//   if (!res.ok) {
//     throw new Error("Failed to fetch category products");
//   }

//   return res.json();
// }

// export default async function CategoryPage({
//   params,
// }: {
//   params: { id: string };
// }) {
//   const products = await getCategoryProducts(params.id);

//   return (
//     <section className="container mx-auto px-4 py-10">
//       <h1 className="text-2xl font-bold mb-6">Category Products</h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {products.map((product) => (
//           <Link
//             key={product.id}
//             href={`/products/${product.id}`}
//             className="border rounded-lg p-4 hover:shadow"
//           >
//             <img
//               src={product.image}
//               alt={product.name}
//               className="h-40 w-full object-cover rounded"
//             />
//             <h3 className="mt-2 font-semibold">{product.name}</h3>
//             <p className="text-primary">৳ {product.price}</p>
//           </Link>
//         ))}
//       </div>
//     </section>
//   );
// }
