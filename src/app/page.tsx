import Link from 'next/link';
import { categories, type Category } from '@/lib/data';
import { Sparkles } from 'lucide-react';
import { BookingWidget } from '@/components/booking-widget';

export default function Home() {
  const categoryMap = categories.reduce((acc, category) => {
    acc[category.slug] = category;
    return acc;
  }, {} as Record<string, Category>);

  const mainSlugs = ['makeup', 'skincare'];
  const mediumSlugs = ['haircare', 'lingerie', 'heels', 'fragrance'];
  const listSlugs = ['pleasure', 'wellness', 'entrepreneurial'];
  const safetySlugs = [
    'safety-tools',
    'home-security',
    'digital-safety',
    'self-defense',
    'sexual-protection-awareness',
  ];
  const travelCategory = categoryMap['travel-getaways'];

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {mainSlugs.map((slug) => {
            const category = categoryMap[slug];
            return (
              <Link
                key={slug}
                href={`/category/${category.slug}`}
                className="lg:col-span-2 p-8 rounded-2xl bg-secondary/40 hover:bg-secondary/70 transition-colors group flex flex-col justify-end min-h-[250px]"
              >
                <category.Icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="font-headline text-3xl font-bold">
                  {category.name}
                </h3>
                <p className="text-muted-foreground mt-1">
                  {category.description}
                </p>
              </Link>
            );
          })}

          {mediumSlugs.map((slug) => {
            const category = categoryMap[slug];
            return (
              <Link
                key={slug}
                href={`/category/${category.slug}`}
                className="p-6 rounded-2xl border bg-card hover:shadow-lg hover:-translate-y-1 transition-all group text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <category.Icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                <h3 className="font-headline text-xl font-bold">
                  {category.name}
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  {category.description}
                </p>
              </Link>
            );
          })}

          <div className="lg:col-span-2 p-6 rounded-2xl border bg-card space-y-4">
            {listSlugs.map((slug) => {
              const category = categoryMap[slug];
              if (!category) return null;
              return (
                <Link
                  key={slug}
                  href={`/category/${category.slug}`}
                  className="flex items-center gap-4 group p-3 -m-3 rounded-lg hover:bg-secondary/40 transition-colors"
                >
                  <category.Icon className="w-7 h-7 text-primary flex-shrink-0" />
                  <h3 className="font-headline text-lg font-semibold">
                    {category.name}
                  </h3>
                </Link>
              );
            })}
          </div>

          <div className="lg:col-span-2 p-6 rounded-2xl border bg-card">
            <h3 className="font-headline text-xl font-bold mb-3">
              Safety & Security
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {safetySlugs.map((slug) => {
                const category = categoryMap[slug];
                if (!category) return null;
                return (
                  <Link
                    key={slug}
                    href={`/category/${category.slug}`}
                    className="flex items-center gap-2 group p-2 -m-2 rounded-lg hover:bg-secondary/40 transition-colors"
                  >
                    <category.Icon className="w-5 h-5 text-primary/80 flex-shrink-0" />
                    <span className="text-sm font-medium">{category.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {travelCategory && (
            <div className="md:col-span-2 lg:col-span-4">
              <BookingWidget category={{
                  name: travelCategory.name,
                  slug: travelCategory.slug,
                  description: travelCategory.description,
              }} />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
