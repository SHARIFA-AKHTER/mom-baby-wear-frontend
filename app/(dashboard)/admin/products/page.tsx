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

import { ProductService } from "@/app/services/product.service";

export default async function AdminProducts() {
  const products = await ProductService.getAll();

  return (
    <div className="p-4 md:p-6">
      <h1 className="text-lg md:text-2xl font-bold mb-4">
        Manage Products
      </h1>

      {/* Table for Desktop */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Title</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr key={p.id} className="border-t">
                <td className="p-3">{p.title}</td>
                <td className="p-3 text-center">৳ {p.price}</td>
                <td className="p-3 text-center">{p.stock}</td>
                <td className="p-3 text-center space-x-2">
                  <button className="px-3 py-1 bg-blue-500 text-white rounded">
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-red-500 text-white rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Card Layout for Mobile */}
      <div className="grid gap-4 md:hidden">
        {products.map((p: any) => (
          <div
            key={p.id}
            className="border rounded-lg p-4 bg-white"
          >
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm text-gray-500">
              ৳ {p.price} | Stock: {p.stock}
            </p>

            <div className="mt-3 flex gap-2">
              <button className="flex-1 bg-blue-500 text-white py-2 rounded">
                Edit
              </button>
              <button className="flex-1 bg-red-500 text-white py-2 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
