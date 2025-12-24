import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4 text-pink-600">
        Mom & Baby Wear
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-6">
        Shop premium quality clothing and essentials for moms and babies.
      </p>
      <Button variant="default" size="lg">
        Shop Now
      </Button>
    </section>
  );
}
