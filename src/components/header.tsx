'use client';

import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';
import Link from 'next/link';

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
      </div>
    </header>
  );
}
