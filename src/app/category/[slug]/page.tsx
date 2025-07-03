'use client';

import { useState, useMemo, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { categories, products as allProducts, type Product } from '@/lib/data';
import { ProductCard } from '@/components/product-card';
import { FilterSidebar } from '@/components/filter-sidebar';
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { LayoutGrid, List } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function CategoryPage({ params: paramsProp }: { params?: { slug: string } }) {
  const params = useParams();
  const slug = (paramsProp?.slug || params.slug) as string;

  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [isFeatured, setIsFeatured] = useState(false);
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState(categories.find((c) => c.slug === slug));

  useEffect(() => {
    if (slug) {
      const categoryData = categories.find((c) => c.slug === slug);
      setCategory(categoryData);
      const categoryProducts = allProducts[slug] || [];
      const filteredProducts = categoryProducts
        .filter((product) => product.price >= priceRange[0] && product.price <= priceRange[1])
        .filter((product) => product.rating >= selectedRating)
        .filter((product) => (isFeatured ? product.isFeatured : true));
      setProducts(filteredProducts);
    }
  }, [slug, priceRange, selectedRating, isFeatured]);


  if (!category) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="font-headline text-3xl">Category not found</h1>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <FilterSidebar
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
        isFeatured={isFeatured}
        setIsFeatured={setIsFeatured}
      />
      <SidebarInset>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-4">
                 <SidebarTrigger className="md:hidden"/>
                 <h1 className="font-headline text-4xl font-bold">{category.name}</h1>
              </div>
              <p className="text-muted-foreground mt-2">
                Showing {products.length} results.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={layout === 'grid' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setLayout('grid')}
              >
                <LayoutGrid className="w-5 h-5" />
              </Button>
              <Button
                variant={layout === 'list' ? 'default' : 'outline'}
                size="icon"
                onClick={() => setLayout('list')}
              >
                <List className="w-5 h-5" />
              </Button>
            </div>
          </div>
          <Separator className="mb-8" />
          {products.length > 0 ? (
            <div
              className={
                layout === 'grid'
                  ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8'
                  : 'flex flex-col gap-4'
              }
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} layout={layout} />
              ))}
            </div>
          ) : (
            <Alert>
              <AlertTitle className="font-headline">No Products Found</AlertTitle>
              <AlertDescription>
                Try adjusting your filters to find what you're looking for.
              </AlertDescription>
            </Alert>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
