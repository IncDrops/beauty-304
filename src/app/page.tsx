import { CategoryCard } from '@/components/category-card';
import { categories } from '@/lib/data';
import { Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-12">
      <section className="text-center mb-16">
        <div className="inline-flex items-center justify-center mb-4">
          <Sparkles className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-headline text-5xl md:text-7xl font-bold text-gray-800 mb-4">
          304Beauty Navigator
        </h1>
        <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
          Your curated guide to beauty, self-care, and street-smart safety.
          Discover top products with AI-powered insights.
        </p>
      </section>

      <section>
        <h2 className="font-headline text-3xl font-bold text-center mb-10">
          Explore Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories.map((category) => (
            <CategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
    </div>
  );
}
