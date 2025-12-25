
type Offer = {
  id: string;
  title: string;
  discount: number;
  description: string;
};

async function getOffers(): Promise<Offer[]> {
  const res = await fetch("http://localhost:5000/api/offers", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch offers");
  }

  return res.json();
}

export default async function OffersPage() {
  const offers = await getOffers();

  return (
    <section className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">Current Offers</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-lg p-6 bg-linear-to-r from-pink-50 to-purple-50"
          >
            <h3 className="text-xl font-semibold">{offer.title}</h3>
            <p className="text-primary font-bold mt-1">
              {offer.discount}% OFF
            </p>
            <p className="text-gray-600 mt-2">{offer.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
