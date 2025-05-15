"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_SERVER_URL } from "../constants"; // ✅ Import useAuth

import api from "../lib/axios";

import { useAuth } from "../context/authContext";
export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth(); // ✅ Access login from context

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      const { token, user } = res.data;

      localStorage.setItem("token", token);
      login(user); // ✅ Update global state
      router.push("/"); // ✅ Redirect
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-1/2 my-20 items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl">
        <h2 className="mb-6 text-center text-2xl font-bold text-cyan-900">Login to Your Account</h2>

        {error && <div className="mb-4 rounded-md bg-red-100 px-4 py-2 text-sm text-red-700">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              required
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-cyan-700 px-4 py-2 text-white hover:bg-cyan-800 disabled:cursor-not-allowed disabled:bg-cyan-400"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-500">
          Don’t have an account?{" "}
          <a href="/register" className="font-medium text-cyan-700 hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}
