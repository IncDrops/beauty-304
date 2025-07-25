'use client';

import Image from 'next/image';
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
import { ArrowRight, Calendar, UserCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { format } from 'date-fns';
import { useEffect, useState } from 'react';

type ProductCardProps = {
  product: Product;
  layout?: 'grid' | 'list';
};

export function ProductCard({ product, layout = 'grid' }: ProductCardProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    setFormattedDate(format(new Date(product.publishedDate), 'PPP'));
  }, [product.publishedDate]);

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
          alt={product.title}
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
         <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/80 to-transparent" />
      </CardHeader>
      <div className="flex flex-col flex-1 p-6">
        <CardTitle className="font-headline text-2xl mb-2 text-white">
          {product.title}
        </CardTitle>
        <div className="flex items-center gap-4 text-sm text-pink-200/80 mb-4">
          <div className="flex items-center gap-2">
            <UserCircle className="w-4 h-4" />
            <span>{product.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <time dateTime={product.publishedDate}>{formattedDate}</time>
          </div>
        </div>
        <CardContent className="p-0 flex-grow text-pink-100/70">
            <CardDescription className="text-pink-100/60 line-clamp-3">
              {product.excerpt}
            </CardDescription>
        </CardContent>
        <CardFooter className="p-0 pt-6">
          <Button asChild className="w-full">
            <Link href={product.href}>
              Read More <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
