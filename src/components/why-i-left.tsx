"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RefreshCw } from 'lucide-react';

const affirmations = [
  'I am worth more than this moment.',
  'Freedom feels scary but it’s mine.',
  'My past does not define my future.',
  'I deserve safety and peace.',
  'Every step away is a step towards myself.',
  'I am strong enough to choose a different path.',
];

export default function WhyILeft() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const showNextAffirmation = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % affirmations.length);
  };

  return (
    <Card className="w-full max-w-md text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Why I Left</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-xl font-light min-h-[6rem] flex items-center justify-center p-4 bg-secondary rounded-lg">
          {affirmations[currentIndex]}
        </p>
        <Button
          onClick={showNextAffirmation}
          className="w-full h-12 text-lg"
        >
          <RefreshCw className="mr-2 h-5 w-5" />
          Show me another reason
        </Button>
      </CardContent>
    </Card>
  );
}
