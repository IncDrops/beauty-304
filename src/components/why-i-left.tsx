"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { RefreshCw, Settings } from 'lucide-react';
import Link from 'next/link';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

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
  const [api, setApi] = useState<CarouselApi>();

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

  const showNextAffirmation = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  return (
    <Card className="w-full max-w-md text-center glassmorphic-card overflow-hidden">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Why I Left</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Carousel
          setApi={setApi}
          className="w-full"
          plugins={[
            Autoplay({
              delay: 5000,
              stopOnInteraction: true,
            }),
          ]}
        >
          <CarouselContent>
            {affirmations.map((affirmation, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <p className="text-xl font-light min-h-[6rem] flex items-center justify-center p-4 bg-secondary/80 rounded-lg">
                    {affirmation}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
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
