/* eslint-disable @typescript-eslint/no-explicit-any */

// export default function AdminProducts(){
//     return(
//         <div>
//             <h1 className="text-2xl font-bold mb-4">Products</h1>
//              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//         {/* Example Product Cards */}
//         {[1, 2, 3, 4].map((id) => (
//           <div key={id} className="bg-white p-4 rounded shadow">
//             <h2 className="font-semibold">Product {id}</h2>
//             <p className="text-gray-500">Price: $20{id}</p>
//           </div>
//         ))}
//       </div>
//         </div>
//     )
// }

// "use client";

// import { useState, useEffect } from "react";
// import { ProductService } from "@/app/services/product.service";
// import ProductRow from "./ProductRow";




// export default function AdminProducts() {
//   const [products, setProducts] = useState<any[]>([]);

//   useEffect(() => {
//     ProductService.getAll().then(setProducts);
//   }, []);

//   const handleDeleted = (id: string) => {
//     setProducts(products.filter(p => p.id !== id));
//   };

//   return (
//     <div className="p-4 md:p-6">
//       <h1 className="text-lg md:text-2xl font-bold mb-4">
//         Manage Products
//       </h1>

//       {/* Desktop Table */}
//       <div className="hidden md:block overflow-x-auto">
//         <table className="w-full border rounded-lg">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="p-3 text-left">Title</th>
//               <th className="p-3">Price</th>
//               <th className="p-3">Stock</th>
//               <th className="p-3">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {products.map(p => (
//               <ProductRow
//                 key={p.id}
//                 product={p}
//                 onDeleted={handleDeleted}
//               />
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Mobile Cards */}
//       <div className="grid gap-4 md:hidden">
//         {products.map(p => (
//           <div
//             key={p.id}
//             className="border rounded-lg p-4 bg-white"
//           >
//             <h3 className="font-semibold">{p.title}</h3>
//             <p className="text-sm text-gray-500">
//               ৳ {p.price} | Stock: {p.stock}
//             </p>

//             <div className="mt-3 flex gap-2">
//               <button
//                 onClick={() => (window.location.href = `/admin/products/edit/${p.id}`)}
//                 className="flex-1 bg-blue-500 text-white py-2 rounded"
//               >
//                 Edit
//               </button>
//               <button
//                 onClick={async () => {
//                   if (!confirm("Delete this product?")) return;
//                   await ProductService.delete(p.id);
//                   setProducts(products.filter(pr => pr.id !== p.id));
//                 }}
//                 className="flex-1 bg-red-500 text-white py-2 rounded"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { ProductService } from "@/app/services/product.service";
import ProductRow from "./ProductRow";
import { useRouter } from "next/navigation";

export default function AdminProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    ProductService.getAll().then((res: any) => {
      
      setProducts(res.data || res);
    });
  }, []);

  const handleDeleted = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Manage Products</h1>
        <button 
           onClick={() => router.push('/admin/products/add')}
           className="bg-green-600 text-white px-4 py-2 rounded shadow"
        >
          Add Product
        </button>
      </div>

      <div className="hidden md:block bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4">Price</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <ProductRow key={p.id} product={p} onDeleted={handleDeleted} />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile view and other logic can remain as you have */}
    </div>
  );
}