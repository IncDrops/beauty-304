"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import { Save, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const DEFAULT_URL = 'https://en.wikipedia.org';

export default function MeTimeSettings() {
  const [url, setUrl] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setIsMounted(true);
    try {
      const savedUrl = localStorage.getItem('meTimeUrl');
      setUrl(savedUrl || DEFAULT_URL);
    } catch (error) {
      console.error("Could not access local storage:", error);
      setUrl(DEFAULT_URL);
    }
  }, []);

  const handleSave = () => {
    try {
        let finalUrl = url.trim();
        if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
            finalUrl = `https://${finalUrl}`;
        }
      localStorage.setItem('meTimeUrl', finalUrl);
      toast({
        title: "Settings Saved",
        description: "Your ME TIME link has been updated.",
      })
    } catch (error) {
      console.error("Could not save to local storage:", error);
      toast({
        variant: "destructive",
        title: "Save Failed",
        description: "Could not save your custom link. Please try again.",
      })
    }
  };
  
  if (!isMounted) {
    return null;
  }

  return (
    <Card className="w-full max-w-md glassmorphic-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">ME TIME Settings</CardTitle>
        <CardDescription>
          Configure the "ME TIME" button. Choose a safe, discreet website that you can exit to instantly.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="url-input">Custom Exit URL</Label>
            <Input 
                id="url-input"
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="e.g., https://www.weather.com"
            />
        </div>
        <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-5 w-5"/>
            Save Link
        </Button>
        <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Disclaimer</AlertTitle>
            <AlertDescription>
                By setting a custom URL, you are directing the app to a third-party website. We are not responsible for the privacy practices or data collection policies of any external site.
            </AlertDescription>
        </Alert>
      </CardContent>
       <CardFooter>
            <Link href="/" passHref className="w-full">
                <Button variant="outline" className="w-full">
                    Back to Home
                </Button>
            </Link>
      </CardFooter>
    </Card>
  );
}
