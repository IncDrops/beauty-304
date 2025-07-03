"use client";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";

const TravelDealsForm = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    offer: "",
    category: "Lingerie", // Adjust per category
  });

  const [status, setStatus] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("Sending...");

    try {
      await emailjs.send("service_49j1r7w", "template_15eum1e", form, "xEVyd3zju8bKBZBNE");
      setStatus("Success! Your bid was submitted.");
      setForm({ name: "", email: "", offer: "", category: "Travel Deals" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("Something went wrong. Try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Your name"
        value={form.name}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="email"
        name="email"
        placeholder="Your email"
        value={form.email}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="text"
        name="offer"
        placeholder="Your offer"
        value={form.offer}
        onChange={handleChange}
        required
        className="input"
      />
      <button type="submit" className="btn">
        Submit Bid
      </button>
      {status && <p className="text-sm mt-2">{status}</p>}
    </form>
  );
};

export default TravelDealsForm;
