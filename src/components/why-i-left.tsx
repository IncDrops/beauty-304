"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RefreshCw, Settings } from 'lucide-react';
import Link from 'next/link';

const defaultAffirmations = [
  'I am worth more than this moment.',
  'Freedom feels scary but it’s mine.',
  'My past does not define my future.',
  'I deserve safety and peace.',
  'Every step away is a step towards myself.',
  'I am strong enough to choose a different path.',
];

export default function WhyILeft() {
  const [affirmations, setAffirmations] = useState<string[]>(defaultAffirmations);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    try {
      const savedAffirmations = localStorage.getItem('whyILeftReasons');
      if (savedAffirmations) {
        const parsedAffirmations = JSON.parse(savedAffirmations);
        if (parsedAffirmations.length > 0) {
          setAffirmations(parsedAffirmations);
        }
      }
    } catch (error) {
      console.error("Could not access local storage:", error);
    }
  }, []);

  const showNextAffirmation = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % affirmations.length);
  };
  
  // Ensure we have a valid index in case affirmations change
  const affirmationToShow = affirmations[currentIndex] || affirmations[0];

  return (
    <Card className="w-full max-w-md text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Why I Left</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-xl font-light min-h-[6rem] flex items-center justify-center p-4 bg-secondary rounded-lg">
          {affirmationToShow}
        </p>
        <Button
          onClick={showNextAffirmation}
          className="w-full h-12 text-lg"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Show me another reason
        </Button>
      </CardContent>
      <CardFooter className="flex justify-end p-2">
         <Link href="/manage-reasons" passHref>
            <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Manage
            </Button>
         </Link>
      </CardFooter>
    </Card>
  );
}
