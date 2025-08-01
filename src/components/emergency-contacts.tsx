"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone, MessageSquare, PlusCircle, Trash2, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
  const [isMounted, setIsMounted] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [newContactIcon, setNewContactIcon] = useState('✨');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactMessage, setNewContactMessage] = useState('Can you call me?');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
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

  const saveContacts = (updatedContacts: Contact[]) => {
    try {
      localStorage.setItem('emergencyContacts', JSON.stringify(updatedContacts));
      setContacts(updatedContacts);
    } catch (error) {
      console.error("Could not save to local storage:", error);
    }
  };

  const handleAddOrUpdateContact = () => {
    if (editingContact) {
      // Update existing contact
      const updatedContacts = contacts.map(c => 
        c.id === editingContact.id ? { ...c, icon: newContactIcon, phone: newContactPhone, message: newContactMessage } : c
      );
      saveContacts(updatedContacts);
    } else {
      // Add new contact
      const newContact: Contact = {
        id: Date.now(),
        icon: newContactIcon,
        phone: newContactPhone,
        message: newContactMessage,
      };
      const updatedContacts = [...contacts, newContact];
      saveContacts(updatedContacts);
    }
    resetForm();
    setIsDialogOpen(false);
  };

  const handleDeleteContact = (id: number) => {
    const updatedContacts = contacts.filter(contact => contact.id !== id);
    saveContacts(updatedContacts);
  };

  const openEditDialog = (contact: Contact) => {
    setEditingContact(contact);
    setNewContactIcon(contact.icon);
    setNewContactPhone(contact.phone);
    setNewContactMessage(contact.message);
    setIsDialogOpen(true);
  };
  
  const openAddDialog = () => {
    resetForm();
    setIsDialogOpen(true);
  }

  const resetForm = () => {
    setEditingContact(null);
    setNewContactIcon('✨');
    setNewContactPhone('');
    setNewContactMessage('Can you call me?');
  };

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
  
  if (!isMounted) {
    return null; // or a loading spinner
  }

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
                    <Button onClick={() => openEditDialog(contact)} variant="ghost" size="icon" aria-label="Edit contact">
                        <Edit className="h-5 w-5 text-gray-500" />
                    </Button>
                    <Button onClick={() => handleDeleteContact(contact.id)} variant="ghost" size="icon" aria-label="Delete contact">
                        <Trash2 className="h-5 w-5 text-destructive" />
                    </Button>
                </div>
            </div>
        ))}
         <div className="pt-4">
            <Dialog open={isDialogOpen} onOpenChange={(isOpen) => {
              setIsDialogOpen(isOpen);
              if (!isOpen) resetForm();
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full" onClick={openAddDialog}>
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add New Contact
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{editingContact ? 'Edit Contact' : 'Add New Contact'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="icon" className="text-right">Icon</Label>
                    <Input id="icon" value={newContactIcon} onChange={(e) => setNewContactIcon(e.target.value)} className="col-span-3" placeholder="e.g., 🧡 or ✨"/>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Phone</Label>
                    <Input id="phone" value={newContactPhone} onChange={(e) => setNewContactPhone(e.target.value)} className="col-span-3" placeholder="111-222-3333"/>
                  </div>
                   <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="message" className="text-right">Message</Label>
                    <Input id="message" value={newContactMessage} onChange={(e) => setNewContactMessage(e.target.value)} className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAddOrUpdateContact} disabled={!newContactPhone.trim()}>
                    {editingContact ? 'Save Changes' : 'Add Contact'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        </div>
      </CardContent>
       <CardFooter className="flex-col items-center justify-center pt-4">
          <div className="w-full">
            <Link href="/" passHref>
                <Button variant="outline" className="w-full">
                    Back to Home
                </Button>
            </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
