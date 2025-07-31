"use client";
// This component is currently not used but can be added to the layout later if navigation is needed.
import Link from 'next/link';

export function Header() {
  return (
    <header className="bg-background border-b sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-bold text-xl">
            ExitRamp
          </span>
        </Link>
      </div>
    </header>
  );
}
