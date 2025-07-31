"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2 } from 'lucide-react';
import Link from 'next/link';

const defaultAffirmations = [
  'I am worth more than this moment.',
  'Freedom feels scary but it’s mine.',
  'My past does not define my future.',
  'I deserve safety and peace.',
  'Every step away is a step towards myself.',
  'I am strong enough to choose a different path.',
];

export default function ManageReasons() {
  const [reasons, setReasons] = useState<string[]>([]);
  const [newReason, setNewReason] = useState('');

  useEffect(() => {
    try {
      const savedReasons = localStorage.getItem('whyILeftReasons');
      if (savedReasons) {
        setReasons(JSON.parse(savedReasons));
      } else {
        setReasons(defaultAffirmations);
      }
    } catch (error) {
      console.error("Could not access local storage:", error);
      setReasons(defaultAffirmations);
    }
  }, []);

  const saveReasons = (updatedReasons: string[]) => {
    try {
      localStorage.setItem('whyILeftReasons', JSON.stringify(updatedReasons));
      setReasons(updatedReasons);
    } catch (error) {
      console.error("Could not save to local storage:", error);
    }
  };

  const handleAddReason = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReason.trim() === '') return;

    const updatedReasons = [...reasons, newReason.trim()];
    saveReasons(updatedReasons);
    setNewReason('');
  };

  const handleDeleteReason = (indexToDelete: number) => {
    const updatedReasons = reasons.filter((_, index) => index !== indexToDelete);
    saveReasons(updatedReasons);
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Manage My Reasons</CardTitle>
        <CardDescription>
          Add, edit, or delete the reasons that keep you going. These are just for you.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleAddReason} className="flex gap-2">
          <Input 
            type="text"
            value={newReason}
            onChange={(e) => setNewReason(e.target.value)}
            placeholder="Add a new reason..."
            className="flex-grow"
          />
          <Button type="submit" size="icon" aria-label="Add Reason">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </form>

        <div className="space-y-2">
          {reasons.map((reason, index) => (
            <div key={index} className="flex items-center justify-between bg-secondary p-2 rounded-lg">
              <p className="flex-grow">{reason}</p>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteReason(index)} aria-label="Delete reason">
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          ))}
        </div>
        
        <div className="pt-4">
            <Link href="/" passHref>
                <Button variant="outline" className="w-full">
                    Back to Home
                </Button>
            </Link>
        </div>
      </CardContent>
    </Card>
  );
}
