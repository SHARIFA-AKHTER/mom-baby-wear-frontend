/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { notFound } from "next/navigation";

interface Product {
  title: string | undefined;
  id: string;
  price: number;
  images: string[]; 
}

async function getCategoryData(id: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${API_URL}/category/${id}`, {
    cache: "no-store", 
  });

  if (!res.ok) {
    if (res.status === 404) return notFound();
    throw new Error("Failed to fetch");
  }

  const jsonResponse = await res.json();
  
  return {
    categoryName: jsonResponse.data?.name || "Category",
    products: jsonResponse.data?.products || []
  };
}

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const { categoryName, products } = await getCategoryData(params.id);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="mb-8 border-b pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{categoryName}</h1>
          <p className="text-gray-500 mt-1">Available items in this category</p>
        </div>
        <p className="font-semibold text-primary">{products.length} Items</p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
          <p className="text-gray-400 text-lg italic">No products available right now.</p>
          <Link href="/" className="mt-4 text-blue-500 hover:underline inline-block">
            Go back to homepage
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product: Product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group bg-white border rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="aspect-square overflow-hidden rounded-xl bg-gray-100 mb-4">
                <img
                
                  src={(product.images && product.images.length > 0) ? product.images[0] : "https://via.placeholder.com/300"}
                  alt={product.title}
                  className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
         
              <h3 className="font-semibold text-gray-800 line-clamp-1">{product.title}</h3>
              <div className="flex justify-between items-center mt-3">
                <p className="text-xl font-bold text-orange-600">৳ {product.price}</p>
                <span className="bg-gray-100 text-[10px] uppercase px-2 py-1 rounded font-bold text-gray-500">Details</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}