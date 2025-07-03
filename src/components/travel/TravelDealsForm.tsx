import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/useAuth";

export default function TravelDealsForm() {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    destination: "",
    tripType: "Hotel + Flight",
    travelStart: "",
    travelEnd: "",
    bidAmount: "",
    notes: "",
    agree: false,
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agree || !user) return;
    if (parseFloat(formData.bidAmount) < 25) {
      alert("Minimum bid amount is $25.");
      return;
    }

    setStatus("submitting");
    try {
      await addDoc(collection(db, "travelBids"), {
        userId: user.uid,
        destination: formData.destination,
        tripType: formData.tripType,
        travelStart: formData.travelStart,
        travelEnd: formData.travelEnd,
        bidAmount: parseFloat(formData.bidAmount),
        notes: formData.notes,
        email: user.email,
        status: "pending",
        createdAt: serverTimestamp(),
      });
      setStatus("success");
      setFormData({
        destination: "",
        tripType: "Hotel + Flight",
        travelStart: "",
        travelEnd: "",
        bidAmount: "",
        notes: "",
        agree: false,
      });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-3xl font-bold mb-4">Name Your Price: Hotels, Flights & More</h1>
      <p className="mb-6 text-gray-600">
        Jetset on your terms. Bid for luxury stays, weekend getaways, and more—at prices <span className="italic">you</span> choose.
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="destination"
          type="text"
          placeholder="Destination (e.g., Miami, Paris)"
          value={formData.destination}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <select
          name="tripType"
          value={formData.tripType}
          onChange={handleChange}
          className="w-full border rounded p-2"
        >
          <option>Hotel Only</option>
          <option>Flight Only</option>
          <option>Hotel + Flight</option>
          <option>Spa Retreat</option>
        </select>

        <div className="flex gap-2">
          <input
            name="travelStart"
            type="date"
            value={formData.travelStart}
            onChange={handleChange}
            className="w-1/2 border rounded p-2"
            required
          />
          <input
            name="travelEnd"
            type="date"
            value={formData.travelEnd}
            onChange={handleChange}
            className="w-1/2 border rounded p-2"
            required
          />
        </div>

        <input
          name="bidAmount"
          type="number"
          placeholder="$ Your Offer"
          value={formData.bidAmount}
          onChange={handleChange}
          className="w-full border rounded p-2"
          required
        />

        <textarea
          name="notes"
          placeholder="Optional notes (e.g., oceanfront preferred)"
          value={formData.notes}
          onChange={handleChange}
          className="w-full border rounded p-2"
        />

        <label className="block text-sm">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mr-2"
            required
          />
          I understand that this is a custom offer and not guaranteed.
        </label>

        <button
          type="submit"
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
          disabled={status === "submitting"}
        >
          {status === "submitting" ? "Submitting..." : "Submit My Offer 💋"}
        </button>

        {status === "success" && <p className="text-green-600">Your bid was submitted! 💼</p>}
        {status === "error" && <p className="text-red-600">Something went wrong. Try again.</p>}
      </form>
    </section>
  );
}
