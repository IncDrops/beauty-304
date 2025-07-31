"use client";

import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function QuickExitButton() {
    const handleExit = (e: React.MouseEvent<HTMLButtonElement>) => {
        // Prevent Next.js router from interfering
        e.preventDefault();
        e.stopPropagation();
        // Redirect the entire window to an external, neutral site.
        window.location.href = 'https://www.google.com';
    };

    return (
        <div className="fixed bottom-5 right-5 z-50">
             <Button 
                variant="default" 
                size="icon" 
                className="h-14 w-14 rounded-full shadow-2xl bg-black hover:bg-gray-800"
                onClick={handleExit}
                aria-label="Quick Exit"
            >
                <LogOut className="h-7 w-7" />
            </Button>
        </div>
    );
}
