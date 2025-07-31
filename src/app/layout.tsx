import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import QuickExitButton from '@/components/quick-exit-button';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ExitRamp',
  description:
    'A safety net for survivors of street sex work/trafficking, designed to interrupt moments of crisis, celebrate progress, and reduce harm.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, 'antialiased min-h-screen flex flex-col')}>
        <main className="flex-1">{children}</main>
        <QuickExitButton />
        <Toaster />
      </body>
    </html>
  );
}
