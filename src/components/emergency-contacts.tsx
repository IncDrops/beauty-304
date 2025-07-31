"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Phone, MessageSquare, PlusCircle, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Contact {
  id: number;
  icon: string;
  phone: string;
  message: string;
}

const defaultContacts: Contact[] = [
    { id: 1, icon: '🧡', phone: '111-111-1111', message: 'Can you call me?'},
    { id: 2, icon: '⚕️', phone: '222-222-2222', message: 'Can you call me?'},
];

export default function EmergencyContacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  
  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem('emergencyContacts');
      if (savedContacts) {
        setContacts(JSON.parse(savedContacts));
      } else {
        setContacts(defaultContacts);
      }
    } catch (error) {
      console.error("Could not access local storage:", error);
      setContacts(defaultContacts);
    }
  }, []);

  // In a real app, these would trigger calls/texts.
  // For this prototype, they just log to the console.
  const handleCall = (phone: string) => {
    console.log(`Calling ${phone}...`);
    // window.location.href = `tel:${phone}`;
  };

  const handleText = (phone: string, message: string) => {
    console.log(`Texting ${phone}: "${message}"`);
    // window.location.href = `sms:${phone}?body=${encodeURIComponent(message)}`;
  };

  return (
    <Card className="w-full max-w-md text-center shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Emergency Contacts</CardTitle>
        <CardDescription>
            Tap to call or text. Your safety net is one touch away.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {contacts.map((contact) => (
            <div key={contact.id} className="flex items-center justify-between bg-secondary p-3 rounded-lg">
                <div className="text-3xl">{contact.icon}</div>
                <div className="flex gap-2">
                    <Button onClick={() => handleCall(contact.phone)} size="icon" aria-label={`Call ${contact.icon}`}>
                        <Phone className="h-5 w-5" />
                    </Button>
                    <Button onClick={() => handleText(contact.phone, contact.message)} variant="outline" size="icon" aria-label={`Text ${contact.icon}`}>
                        <MessageSquare className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        ))}
         <div className="pt-4">
            <Button variant="outline" className="w-full">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add New Contact
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
