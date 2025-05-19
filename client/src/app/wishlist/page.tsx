"use client";

import React, { useEffect, useState } from "react";
import api from "../lib/axios";
import { useAuth } from "../context/authContext";
import { Trip } from "../trips/[id]/types";
import WideCard from "../cards/WideCard";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn, hasMounted } = useAuth();

  useEffect(
    () => {
      if (!isLoggedIn) return;

      const fetchWishlist = async () => {
        try {
          const res = await api.get("/wishlist"); // Ton Axios instance doit déjà inclure le token
          setWishlist(res.data);
        } catch (err) {
          console.error("Failed to fetch wishlist:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchWishlist();
    },
    [isLoggedIn]
  );

  if (!hasMounted) return null; // Évite les erreurs hydration côté client

  return (
    <div className=" mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
      <p className="mb-6 text-gray-600">
        Here you can view and manage your favorite trips. Add trips to your wishlist from the trip details page and plan your
        next adventure!
      </p>

      {loading ? (
        <div>Loading wishlist...</div>
      ) : wishlist.length === 0 ? (
        <div className="text-gray-500">No trips in your wishlist yet.</div>
      ) : (
        <div className="flex flex-col gap-2">
          {wishlist.map(trip => (
            <WideCard
              key={trip.id}
              id={trip.id}
              image={trip.image}
              title={trip.title}
              description={trip.description}
              price={"f"}
              rating={trip.rating}
              User={trip.User}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
