import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function PrivacyPolicyPage() {
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-8">
      <Card className="w-full max-w-2xl shadow-lg glassmorphic-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">304 Beauty Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base leading-relaxed">
          <p className="text-sm text-muted-foreground">Last Updated: {today}</p>
          
          <h2 className="text-xl font-semibold">We Do Not Collect Your Data. Ever.</h2>
          <p className="font-bold">No Tracking, No Storage, No BS</p>
          <p>
            304 Beauty does not collect, store, or share your personal data, location history, or app usage.
          </p>
          <p>
            Everything (hotspots, journal entries, contacts) stays only on your device. We have no servers.
          </p>

          <h2 className="text-xl font-semibold">GPS Hotspot Alerts</h2>
          <p>
            Your marked locations are stored locally and never transmitted to us or third parties.
          </p>
          <p>
            GPS is used only to alert you in real-time—no location history is saved.
          </p>

          <h2 className="text-xl font-semibold">Emergency Contacts</h2>
          <p>
            Contacts added to the app are not uploaded or backed up. If you delete the app, they’re gone.
          </p>

          <h2 className="text-xl font-semibold">No Monetization</h2>
          <p>
            304 Beauty has no ads, no subscriptions, and no profit motive. We’ll never sell data because we don’t have any.
          </p>

          <h2 className="text-xl font-semibold">Your Rights</h2>
          <p>
            Delete all data instantly: Just uninstall the app. Poof—it’s gone.
          </p>

           <div className="pt-4">
            <Link href="/" passHref>
                <Button variant="outline" className="w-full">
                    Back to Home
                </Button>
            </Link>
        </div>
        </CardContent>
      </Card>
    </div>
  );
}
