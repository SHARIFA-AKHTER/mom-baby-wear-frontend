/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

// Category Interface based on your Backend JSON
interface Category {
  id: string;
  name: string;
  slug: string;
}

async function getAllCategories(): Promise<Category[]> {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  const res = await fetch(`${API_URL}/category`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  const jsonResponse = await res.json();
  // Tomar backend response-e 'data' field-e array thake
  return jsonResponse.data || [];
}

export default async function AllCategoriesPage() {
  const categories = await getAllCategories();

  return (
    <section className="container mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="mb-8 border-b pb-4 flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">All Categories</h1>
          <p className="text-gray-500 mt-1">Browse our products by category</p>
        </div>
        <p className="font-semibold text-primary">{categories.length} Categories</p>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-xl border-2 border-dashed">
          <p className="text-gray-400 text-lg italic">No categories found.</p>
        </div>
      ) : (
        /* Responsive Grid: Mobile 1, Tablet 2, Small Desktop 3, Large Desktop 4 */
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group bg-white border rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Category Icon Placeholder */}
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-orange-50 transition-all duration-500">
                <span className="text-4xl text-orange-500">📦</span>
              </div>

              <h3 className="font-bold text-xl text-gray-800 group-hover:text-orange-600 transition-colors">
                {category.name}
              </h3>
              
              <p className="text-sm text-gray-400 mt-2 italic group-hover:text-gray-600">
                Click to explore items
              </p>

              <div className="mt-4 w-full pt-4 border-t border-gray-50 flex justify-center">
                 <span className="text-xs font-bold uppercase tracking-widest text-orange-600 group-hover:tracking-normal transition-all">
                   View Products →
                 </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}