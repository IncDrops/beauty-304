"use client";
import { useState } from "react";

export default function HeelsBidForm() {
  const [form, setForm] = useState({ name: "", email: "", offer: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Heels bid submitted:", form);
    // Future: Send to Firestore 'heelsBids'
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <h2 className="text-xl font-semibold">Name Your Price for Heels</h2>
      <input type="text" name="name" placeholder="Your name" className="w-full border p-2" onChange={handleChange} />
      <input type="email" name="email" placeholder="Email" className="w-full border p-2" onChange={handleChange} />
      <input type="text" name="offer" placeholder="Your offer amount" className="w-full border p-2" onChange={handleChange} />
      <button type="submit" className="bg-red-600 text-white px-4 py-2">Submit Offer</button>
    </form>
  );
}
