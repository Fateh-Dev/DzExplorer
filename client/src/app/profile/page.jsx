"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import UserProfile from "../components/userProfile";
import { useAuth } from "../context/authContext";
import api from "../lib/axios";

export default function ProfilePage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const [user, setUser] = useState(null);
  const hasFetchedRef = useRef(false);

  useEffect(
    () => {
      if (!isLoggedIn) {
        router.push("/login");
        return;
      }

      if (hasFetchedRef.current) return; // prevent duplicate fetch
      hasFetchedRef.current = true;

      const fetchProfile = async () => {
        try {
          // Just call api.get without headers or withCredentials here
          const res = await api.get("/profile");
          setUser(res.data);
        } catch (err) {
          console.error("Error fetching profile", err);
        }
      };

      fetchProfile();
    },
    [isLoggedIn, router]
  );

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <UserProfile user={user} />
    </div>
  );
}
