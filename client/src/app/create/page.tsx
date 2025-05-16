"use client";

import React, { useState } from "react";
import axios from "axios";
import api from "../lib/axios";
import toast from "react-hot-toast";

// const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/YOUR_CLOUDINARY_CLOUD_NAME/upload`;
// const UPLOAD_PRESET = "YOUR_UPLOAD_PRESET";

interface TripFormData {
  title: string;
  description: string;
  rating: number;
  image: string;
  thumbnail: string;
  price: number;
  date: string;
}

export default function CreateTripForm() {
  const [form, setForm] = useState<TripFormData>({
    title: "",
    description: "",
    rating: 0,
    image: "",
    thumbnail: "",
    price: 0,
    date: "",
  });
 
  const [error, setError] = useState<string | null>(null);
 
 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === "rating" || name === "price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic validation
    if (
      !form.title ||
      !form.description || 
      !form.price ||
      !form.date
    ) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await  api.post("/trips", form);
     toast.success("Trip created successfully!");
      console.log("Trip created:", response.data);
      setForm({
        title: "",
        description: "",
        rating: 0,
        image: "",
        thumbnail: "",
        price: 0,
        date: "",
      });
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to create trip");
      } else {
        setError("Failed to create trip");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h1 className="text-2xl font-semibold mb-4">Create a New Trip</h1>

      {error && (
        <div className="text-red-600 bg-red-100 p-2 rounded">{error}</div>
      )}

      <label className="block">
        Title
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          className="w-full mt-1 border rounded px-3 py-2"
          required
        />
      </label>

      <label className="block">
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          className="w-full mt-1 border rounded px-3 py-2"
          required
        />
      </label> 

      <label className="block">
        Price (DZD)
        <input
          type="number"
          name="price"
          value={form.price}
          min={0}
          step="0.01"
          onChange={handleChange}
          className="w-full mt-1 border rounded px-3 py-2"
          required
        />
      </label>

      <label className="block">
        Date
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full mt-1 border rounded px-3 py-2"
          required
        />
      </label>
 
    

      <button
        type="submit" 
        className="w-full bg-cyan-900 text-white py-2 rounded hover:bg-cyan-800 transition"
      >
        ssssss
      </button>
    </form>
  );
}
