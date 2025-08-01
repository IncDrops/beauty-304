import DailyWins from '@/components/daily-wins';
import WhyILeft from '@/components/why-i-left';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Phone, MapPinOff, ClipboardList, Settings, LogOut } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import MeTimeButton from '@/components/me-time-button';
import { ClientOnly } from '@/components/client-only';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 space-y-8 pt-8">
      <WhyILeft />
      <DailyWins />
      <div className="w-full max-w-md grid grid-cols-1 gap-4">
        <Link href="/planner" passHref>
          <Button variant="secondary" className="w-full h-12 text-lg glassmorphic-card">
            <ClipboardList className="mr-2 h-5 w-5" />
            My Planner
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link href="/emergency-contacts" passHref>
          <Button variant="secondary" className="w-full h-12 text-lg glassmorphic-card">
            <Phone className="mr-2 h-5 w-5" />
            Emergency Contacts
          </Button>
        </Link>
        <Link href="/hotspots" passHref>
          <Button variant="secondary" className="w-full h-12 text-lg glassmorphic-card">
            <MapPinOff className="mr-2 h-5 w-5" />
            Manage Hotspots
          </Button>
        </Link>
      </div>
      <div className="w-full max-w-md grid grid-cols-1 gap-4">
        <MeTimeButton />
      </div>
       <div className="w-full max-w-md grid grid-cols-1 md:grid-cols-2 gap-4">
         <Link href="/me-time" passHref>
          <Button variant="secondary" className="w-full h-12 text-lg glassmorphic-card">
            <Settings className="mr-2 h-5 w-5" />
            ME TIME Settings
          </Button>
        </Link>
        <ClientOnly>
          <ThemeToggle />
        </ClientOnly>
      </div>
      <footer className="w-full max-w-md text-center py-4">
        <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
          <Link href="/privacy-policy" className="hover:underline text-white">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline text-white">
            Terms of Service
          </Link>
        </div>
      </footer>
    </div>
  );
}
