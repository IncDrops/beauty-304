import Link from 'next/link';
import type { Category } from '@/lib/data';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  const { name, slug, description, Icon } = category;
  return (
    <Link href={`/category/${slug}`} className="group block">
      <Card className="h-full transition-all duration-300 ease-in-out group-hover:shadow-lg group-hover:-translate-y-1 group-hover:border-primary">
        <CardHeader className="relative">
          <div className="mb-4">
            <Icon className="w-10 h-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">{name}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <ArrowRight className="absolute top-4 right-4 w-5 h-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
        </CardHeader>
      </Card>
    </Link>
  );
}
