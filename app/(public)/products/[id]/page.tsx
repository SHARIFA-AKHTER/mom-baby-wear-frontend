
import { notFound } from "next/navigation";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
};

async function getProduct(id: string): Promise<Product> {
  const res = await fetch(`http://localhost:5000/api/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function ProductDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-lg"
        />

        <div>
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-xl text-primary font-semibold mt-2">
            ৳ {product.price}
          </p>

          <p className="mt-4 text-gray-600">{product.description}</p>

          <button className="mt-6 px-6 py-2 bg-primary text-white rounded-lg">
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
}
