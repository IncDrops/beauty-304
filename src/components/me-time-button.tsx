"use client";

import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { useEffect, useState } from 'react';

const DEFAULT_URL = 'https://en.wikipedia.org';

export default function MeTimeButton() {
    const [exitUrl, setExitUrl] = useState(DEFAULT_URL);

    useEffect(() => {
        // This effect runs on the client after hydration
        try {
            const savedUrl = localStorage.getItem('meTimeUrl');
            if (savedUrl) {
                setExitUrl(savedUrl);
            }
        } catch (error) {
            console.error("Could not access local storage:", error);
        }
    }, []);


    const handleExit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        window.location.href = exitUrl;
    };

    return (
        <Button onClick={handleExit} className="w-full h-12 text-lg" variant="destructive">
            <LogOut className="mr-2 h-5 w-5" />
            ME TIME
        </Button>
    );
}