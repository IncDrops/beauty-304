"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const HeelsBidForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    offer: "",
    category: "Heels",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.send("service_49j1r7w", "template_15eum1e", form, "xEVyd3zju8bKBZBNE");
      toast({
        title: "Success!",
        description: "Your bid was submitted.",
      });
      setForm({ name: "", email: "", offer: "", category: "Heels" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-8rem)]">
      <Card className="w-full max-w-md glassmorphic">
        <CardHeader>
          <CardTitle className="font-headline text-3xl">Name Your Price: Heels</CardTitle>
          <CardDescription>Submit your offer and we'll see if we can match it.</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Your Name</Label>
              <Input
                id="name"
                type="text"
                name="name"
                placeholder="Jane Doe"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Your Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="offer">Your Offer ($)</Label>
              <Input
                id="offer"
                type="number"
                name="offer"
                placeholder="50.00"
                value={form.offer}
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Submitting..." : "Submit Bid"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default HeelsBidForm;
