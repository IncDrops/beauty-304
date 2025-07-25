'use client';

import { cn } from '@/lib/utils';
import { Sparkles, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { categories } from '@/lib/data';
import React from 'react';

const mainCategories = [
  'makeup',
  'skincare',
  'hair',
  'pleasure',
  'protection',
  'entrepreneurial',
];
const mainCats = categories.filter((c) => mainCategories.includes(c.slug));
const moreCats = categories.filter((c) => !mainCategories.includes(c.slug));

export function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-sm border-b border-white/10 sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <Sparkles className="w-7 h-7 text-primary" />
          <span className="font-headline text-2xl font-bold text-gray-100">
            304Beauty Navigator
          </span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            {mainCats.map((category) => (
              <NavigationMenuItem key={category.slug}>
                <Link href={`/${category.slug}`} legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {category.name}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}

            <NavigationMenuItem>
              <NavigationMenuTrigger>More</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {moreCats.map((component) => (
                    <ListItem
                      key={component.name}
                      title={component.name}
                      href={`/${component.slug}`}
                    >
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
