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
        'transition-all duration-300 ease-in-out hover:shadow-xl w-full flex',
        isGridLayout ? 'flex-col' : 'flex-row items-center'
      )}
    >
      <CardHeader
        className={cn(
          isGridLayout ? 'p-0' : 'p-4',
          !isGridLayout && 'w-1/4'
        )}
      >
        <div
          className={cn(
            'relative',
            isGridLayout ? 'w-full h-56' : 'w-full aspect-square'
          )}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover rounded-t-lg"
            data-ai-hint="product image"
          />
          {product.isFeatured && (
            <Badge className="absolute top-2 right-2" variant="default">
              Featured Pick
            </Badge>
          )}
        </div>
      </CardHeader>
      <div className={cn('flex flex-col flex-1', isGridLayout ? 'p-6' : 'p-4')}>
        <CardTitle className="font-headline text-xl mb-2">{product.name}</CardTitle>
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{product.rating.toFixed(1)}</span>
          </div>
          <span className="font-bold text-lg text-primary">
            ${product.price.toFixed(2)}
          </span>
        </div>
        <CardContent className="p-0 flex-grow">
          {isLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          ) : summary ? (
            <p className="text-sm text-muted-foreground">{summary}</p>
          ) : (
            <CardDescription>
              Click the button to get an AI-powered summary of user reviews.
            </CardDescription>
          )}
        </CardContent>
        <CardFooter className="p-0 pt-4 flex-col sm:flex-row gap-2 items-stretch sm:items-center">
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
              View Deal
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
