"use client";

import React, { useState } from "react";
import axios from "axios";
import api from "../lib/axios";
import toast from "react-hot-toast";

interface TripFormData {
  title: string;
  description: string;
  image: string;
  thumbnail: string;
  price: number;
  date: string;
}

export default function CreateTripForm() {
  const [form, setForm] = useState<TripFormData>({
    title: "",
    description: "",
    image: "",
    thumbnail: "",
    price: 0,
    date: "",
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const res = await api.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return res.data.url; // Cloudinary image URL
  } catch {
    throw new Error("Failed to upload image");
  }
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.title || !form.description || !form.price || !form.date) {
      setError("Please fill in all required fields.");
      return;
    }

    if (form.price <= 0) {
      setError("Price must be greater than 0.");
      return;
    }

    try {
      toast.loading("Uploading images...");

      let imageUrl = form.image;
      let thumbnailUrl = form.thumbnail;

      if (imageFile) {
        imageUrl = await uploadToCloudinary(imageFile);
      }

      if (thumbnailFile) {
        thumbnailUrl = await uploadToCloudinary(thumbnailFile);
      }

      const finalForm = {
        ...form,
        image: imageUrl,
        thumbnail: thumbnailUrl,
      };

      await api.post("/trips", finalForm);

      toast.success("Trip created successfully!");
      setForm({
        title: "",
        description: "",
        image: "",
        thumbnail: "",
        price: 0,
        date: "",
      });
      setImageFile(null);
      setThumbnailFile(null);
    } catch (err: unknown) {
      toast.dismiss();
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.error || "Failed to create trip");
      } else {
        setError("Failed to create trip");
      }
    } finally {
      toast.dismiss();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-8 rounded-xl shadow-lg bg-white sm:p-10 space-y-6"
    >
      <h1 className="text-3xl font-extrabold text-cyan-900 mb-6 text-center drop-shadow-md">
        Create a New Trip
      </h1>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 rounded-md border border-red-300 font-semibold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <label className="flex flex-col sm:col-span-2">
          <span className="mb-1 font-semibold text-cyan-900">Title</span>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Amazing Trip to Sahara"
            className="rounded-md border px-4 py-2 transition"
            required
          />
        </label>

        <label className="flex flex-col sm:col-span-2">
          <span className="mb-1 font-semibold text-cyan-900">Description</span>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={5}
            placeholder="Write a detailed description about your trip..."
            className="rounded-md border px-4 py-2 transition"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-cyan-900">Date</span>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="rounded-md border px-4 py-2 transition"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-cyan-900">Price (DZD)</span>
          <input
            type="number"
            name="price"
            value={form.price}
            min={0.01}
            step="0.01"
            onChange={handleChange}
            placeholder="1234.56"
            className="rounded-md border px-4 py-2 transition"
            required
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-cyan-900">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="rounded-md border px-4 py-2 transition"
          />
        </label>

        <label className="flex flex-col">
          <span className="mb-1 font-semibold text-cyan-900">Upload Thumbnail</span>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setThumbnailFile(e.target.files?.[0] || null)}
            className="rounded-md border px-4 py-2 transition"
          />
        </label>
      </div>

      <button
        type="submit"
        className="w-full py-3 bg-cyan-700 text-white font-bold rounded-xl hover:bg-cyan-800 active:bg-cyan-900"
      >
        Create Trip
      </button>
    </form>
  );
}
