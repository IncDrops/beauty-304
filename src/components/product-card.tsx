'use client';

import Image from 'next/image';
import { useState } from 'react';
import type { Product } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Zap } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { summarizeReviewsAction } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
  layout?: 'grid' | 'list';
};

export function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerateSummary = async () => {
    setIsLoading(true);
    const result = await summarizeReviewsAction(product.name, product.reviews);
    setIsLoading(false);

    if (result.error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: result.error,
      });
    } else {
      setSummary(result.summary);
    }
  };

  const isGridLayout = layout === 'grid';

  return (
    <Card
      className={cn(
        'transition-all duration-300 ease-in-out hover:shadow-2xl hover:shadow-primary/20 w-full flex flex-col h-full glassmorphic overflow-hidden'
      )}
    >
      <CardHeader className="p-0 relative h-56">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover opacity-50 group-hover:opacity-75 transition-opacity"
          data-ai-hint="product image"
        />
        {product.isFeatured && (
          <Badge className="absolute top-4 right-4" variant="default">
            Featured Pick
          </Badge>
        )}
      </CardHeader>
      <div className="flex flex-col flex-1 p-6">
        <CardTitle className="font-headline text-2xl mb-2 text-white">
          {product.name}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-pink-200/80 mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span className="font-bold text-lg text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <CardContent className="p-0 flex-grow text-pink-100/70">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full bg-white/20" />
              <Skeleton className="h-4 w-full bg-white/20" />
              <Skeleton className="h-4 w-3/4 bg-white/20" />
            </div>
          ) : summary ? (
            <p className="text-sm">{summary}</p>
          ) : (
            <CardDescription className="text-pink-100/60">
              {product.reviews.substring(0, 100)}...
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="p-0 pt-6 flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <Button
            onClick={handleGenerateSummary}
            disabled={isLoading}
            variant="secondary"
            className="w-full"
          >
            <Zap className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'AI Summary'}
          </Button>
          <Button asChild className="w-full">
            <Link href={product.affiliateLink} target="_blank">
              View Product
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}