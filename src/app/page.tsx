import DailyWins from '@/components/daily-wins';
import WhyILeft from '@/components/why-i-left';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, MapPinOff } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 space-y-8 pt-8">
      <WhyILeft />
      <DailyWins />
      <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/emergency-contacts" passHref>
          <Button variant="secondary" className="w-full h-12 text-lg">
            <Phone className="mr-2 h-5 w-5" />
            Emergency Contacts
          </Button>
        </Link>
        <Link href="/hotspots" passHref>
          <Button variant="secondary" className="w-full h-12 text-lg">
            <MapPinOff className="mr-2 h-5 w-5" />
            Manage Hotspots
          </Button>
        </Link>
      </div>
      <footer className="w-full max-w-md text-center py-4">
        <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
          <ThemeToggle />
        </div>
      </footer>
    </div>
  );
}
