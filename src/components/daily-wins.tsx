"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PlusCircle, Trash2 } from 'lucide-react';

interface Win {
  id: number;
  text: string;
  date: string;
}

export default function DailyWins() {
  const [wins, setWins] = useState<Win[]>([]);
  const [newWin, setNewWin] = useState('');
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    try {
      const savedWins = localStorage.getItem('dailyWins');
      const savedStreak = localStorage.getItem('winStreak');
      const lastWinDate = localStorage.getItem('lastWinDate');

      if (savedWins) {
        setWins(JSON.parse(savedWins));
      }

      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      
      if (savedStreak && lastWinDate) {
        if (lastWinDate === today) {
          setStreak(JSON.parse(savedStreak));
        } else if (lastWinDate === yesterday) {
           setStreak(JSON.parse(savedStreak));
        } else {
          setStreak(0);
          localStorage.setItem('winStreak', JSON.stringify(0));
        }
      }

    } catch (error) {
      console.error("Could not access local storage:", error);
    }
  }, []);

  const saveWins = (updatedWins: Win[], newStreak: number) => {
    try {
      const today = new Date().toISOString().split('T')[0];
      localStorage.setItem('dailyWins', JSON.stringify(updatedWins));
      localStorage.setItem('winStreak', JSON.stringify(newStreak));
      localStorage.setItem('lastWinDate', today);
    } catch (error) {
       console.error("Could not save to local storage:", error);
    }
  };

  const handleAddWin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newWin.trim() === '') return;

    const today = new Date().toISOString().split('T')[0];
    const lastWinDate = localStorage.getItem('lastWinDate');
    
    let newStreak = streak;
    if (lastWinDate !== today) {
       const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
       if (lastWinDate === yesterday) {
         newStreak = streak + 1;
       } else {
         newStreak = 1;
       }
    } else if (streak === 0) {
      newStreak = 1;
    }
    
    setStreak(newStreak);

    const winToAdd: Win = {
      id: Date.now(),
      text: newWin.trim(),
      date: today,
    };

    const updatedWins = [...wins, winToAdd];
    setWins(updatedWins);
    setNewWin('');
    saveWins(updatedWins, newStreak);
  };

  const handleDeleteWin = (id: number) => {
    const updatedWins = wins.filter(win => win.id !== id);
    setWins(updatedWins);
    saveWins(updatedWins, streak);
  }
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todaysWins = wins.filter(w => w.date === todayStr);

  return (
    <Card className="w-full max-w-md text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Daily Wins</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleAddWin} className="flex gap-2">
          <Input 
            type="text"
            value={newWin}
            onChange={(e) => setNewWin(e.target.value)}
            placeholder="Log a small victory..."
            className="flex-grow"
          />
          <Button type="submit" size="icon" aria-label="Add Win">
            <PlusCircle className="h-5 w-5" />
          </Button>
        </form>
        <div className="space-y-2 text-left">
          {todaysWins.length > 0 ? (
            todaysWins.map((win) => (
              <div key={win.id} className="flex items-center justify-between bg-secondary p-2 rounded-lg">
                <p>{win.text}</p>
                <Button variant="ghost" size="icon" onClick={() => handleDeleteWin(win.id)} aria-label="Delete win">
                  <Trash2 className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm p-4">No wins logged for today yet. You can do it.</p>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-center bg-gray-50 p-4">
        <div className="text-lg font-semibold">
          Daily Streak: <span className="text-primary">{streak} {streak === 1 ? 'Day' : 'Days'}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
