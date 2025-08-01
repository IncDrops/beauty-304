'use client';

import * as React from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <div className="grid grid-cols-3 gap-1 h-full">
      <Button
        variant={theme === 'light' ? 'default' : 'secondary'}
        onClick={() => setTheme('light')}
        className="h-full text-lg w-full"
      >
        <Sun className="h-5 w-5" />
        Light
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'secondary'}
        onClick={() => setTheme('dark')}
        className="h-full text-lg w-full"
      >
        <Moon className="h-5 w-5" />
        Dark
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'secondary'}
        onClick={() => setTheme('system')}
        className="h-full text-lg w-full"
      >
        <Monitor className="h-5 w-5" />
        System
      </Button>
    </div>
  );
}
