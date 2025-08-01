import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function TermsOfServicePage() {
    const today = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-4 pt-8">
      <Card className="w-full max-w-2xl shadow-lg glassmorphic-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">ExitRamp Terms of Service</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-base leading-relaxed">
            <p className="text-sm text-muted-foreground">Last Updated: {today}</p>

            <h2 className="text-xl font-semibold">Purpose</h2>
            <p>
                ExitRamp is a peer-created tool for harm reduction and crisis support. It is not a substitute for professional help.
            </p>

            <h2 className="text-xl font-semibold">No Warranty</h2>
            <p>
                We strive for reliability, but the app is provided “as is” with no guarantees of functionality.
            </p>

            <h2 className="text-xl font-semibold">Discretion Advised</h2>
            <p>
                You’re responsible for safeguarding your device (e.g., using a PIN lock). ExitRamp’s quick-exit feature helps but isn’t foolproof.
            </p>

            <h2 className="text-xl font-semibold">Changes</h2>
            <p>
                If we ever update data practices (e.g., adding optional backups), we’ll notify users and require consent.
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
