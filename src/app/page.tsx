
import { ProductCard } from '@/components/product-card';
import { TravelChatbot } from '@/components/travel-chatbot';
import { products } from '@/lib/data';

export default function Home() {
  const allProducts = Object.values(products).flat();

  return (
    <div className="container mx-auto px-4 py-12">
      <section className="mb-16">
        <div className="text-center">
          <h1 className="font-headline text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-300 to-white mb-4">
            Your AI Travel Navigator
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-pink-100/70">
            From hidden gems to the safest stays, get personalized travel advice
            and deals.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <TravelChatbot />
      </section>

      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allProducts.map((product, index) => (
            <div
              key={product.id}
              className={
                index % 5 === 0 || index % 5 === 3
                  ? 'md:col-span-2'
                  : 'col-span-1'
              }
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
