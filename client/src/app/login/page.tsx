"use client";
import React from "react";
import { signIn } from "next-auth/react";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-cyan-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md flex flex-col items-center">
        <Image src="/logo.png" alt="Logo" width={64} height={64} className="mb-4" />
        <h1 className="text-2xl font-bold mb-6 text-cyan-900">Sign in to your account</h1>
        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 bg-cyan-900 text-white py-2 px-4 rounded-md hover:bg-cyan-800 transition mb-3"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#clip0_17_40)"><path d="M47.532 24.552c0-1.636-.146-3.2-.418-4.704H24.48v9.02h13.02c-.562 3.02-2.25 5.58-4.8 7.304v6.06h7.76c4.54-4.18 7.072-10.34 7.072-17.68z" fill="#4285F4"/><path d="M24.48 48c6.48 0 11.92-2.14 15.9-5.82l-7.76-6.06c-2.16 1.44-4.92 2.3-8.14 2.3-6.26 0-11.56-4.22-13.46-9.9H2.5v6.22C6.46 43.82 14.7 48 24.48 48z" fill="#34A853"/><path d="M11.02 28.52a14.98 14.98 0 010-9.04v-6.22H2.5a24.01 24.01 0 000 21.48l8.52-6.22z" fill="#FBBC05"/><path d="M24.48 9.54c3.54 0 6.7 1.22 9.2 3.62l6.88-6.88C36.4 2.14 30.96 0 24.48 0 14.7 0 6.46 4.18 2.5 10.26l8.52 6.22c1.9-5.68 7.2-9.9 13.46-9.9z" fill="#EA4335"/></g><defs><clipPath id="clip0_17_40"><path fill="#fff" d="M0 0h48v48H0z"/></clipPath></defs></svg>
          Continue with Google
        </button>
        <button
          onClick={() => signIn("facebook")}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          <svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44.5 24c0-11.046-8.954-20-20-20S4.5 12.954 4.5 24c0 9.991 7.354 18.253 17 19.8V31.1h-5.1v-7.1h5.1v-5.4c0-5.1 3.1-7.9 7.7-7.9 2.2 0 4.5.4 4.5.4v5h-2.5c-2.5 0-3.3 1.6-3.3 3.2v3.7h6.6l-1.1 7.1h-5.5v12.7c9.646-1.547 17-9.809 17-19.8z" fill="#1877F3"/><path d="M33.4 31.1l1.1-7.1h-6.6v-3.7c0-1.6.8-3.2 3.3-3.2h2.5v-5s-2.3-.4-4.5-.4c-4.6 0-7.7 2.8-7.7 7.9v5.4h-5.1v7.1h5.1v12.7c1.7.27 3.44.41 5.2.41s3.5-.14 5.2-.41V31.1h5.5z" fill="#fff"/></svg>
          Continue with Facebook
        </button>
        <p className="mt-6 text-gray-500 text-sm text-center">You can browse the app without logging in. Login is only required for personalized features.</p>
      </div>
    </div>
  );
}