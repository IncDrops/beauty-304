"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2, MapPinOff } from 'lucide-react';
import Link from 'next/link';

interface Hotspot {
  id: number;
  name: string;
  address: string;
}

const defaultHotspots: Hotspot[] = [
    {id: 1, name: "Example: Risky Area", address: "123 Danger St, City"},
];

export default function ManageHotspots() {
  const [hotspots, setHotspots] = useState<Hotspot[]>([]);
  const [newHotspotName, setNewHotspotName] = useState('');
  const [newHotspotAddress, setNewHotspotAddress] = useState('');

  useEffect(() => {
    try {
      const savedHotspots = localStorage.getItem('hotspots');
      if (savedHotspots) {
        setHotspots(JSON.parse(savedHotspots));
      } else {
        setHotspots(defaultHotspots);
      }
    } catch (error) {
      console.error("Could not access local storage:", error);
      setHotspots(defaultHotspots);
    }
  }, []);

  const saveHotspots = (updatedHotspots: Hotspot[]) => {
    try {
      localStorage.setItem('hotspots', JSON.stringify(updatedHotspots));
      setHotspots(updatedHotspots);
    } catch (error) {
      console.error("Could not save to local storage:", error);
    }
  };

  const handleAddHotspot = (e: React.FormEvent) => {
    e.preventDefault();
    if (newHotspotName.trim() === '' || newHotspotAddress.trim() === '') return;

    const newHotspot: Hotspot = {
      id: Date.now(),
      name: newHotspotName.trim(),
      address: newHotspotAddress.trim(),
    };
    
    const updatedHotspots = [...hotspots, newHotspot];
    saveHotspots(updatedHotspots);
    setNewHotspotName('');
    setNewHotspotAddress('');
  };

  const handleDeleteHotspot = (id: number) => {
    const updatedHotspots = hotspots.filter(hotspot => hotspot.id !== id);
    saveHotspots(updatedHotspots);
  };

  return (
    <Card className="w-full max-w-md glassmorphic-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2"><MapPinOff /> Manage Hotspots</CardTitle>
        <CardDescription>
          Mark unsafe locations to get alerts when you're nearby. This data stays only on your device.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleAddHotspot} className="space-y-2">
            <Input 
                type="text"
                value={newHotspotName}
                onChange={(e) => setNewHotspotName(e.target.value)}
                placeholder="Name (e.g., 'Downtown Corner')"
                className="flex-grow"
            />
            <Input 
                type="text"
                value={newHotspotAddress}
                onChange={(e) => setNewHotspotAddress(e.target.value)}
                placeholder="Address or description"
                className="flex-grow"
            />
          <Button type="submit" className="w-full" aria-label="Add Hotspot">
            <PlusCircle className="h-5 w-5 mr-2" />
            Add New Hotspot
          </Button>
        </form>

        <div className="space-y-2 pt-4">
          {hotspots.map((hotspot) => (
            <div key={hotspot.id} className="flex items-start justify-between bg-secondary p-3 rounded-lg">
              <div className="flex-grow">
                <p className="font-semibold">{hotspot.name}</p>
                <p className="text-sm text-muted-foreground">{hotspot.address}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleDeleteHotspot(hotspot.id)} aria-label="Delete hotspot">
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
