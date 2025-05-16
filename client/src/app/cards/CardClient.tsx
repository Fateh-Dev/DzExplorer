"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import api from "../lib/axios";
import WishlistButton from "./WishlistButton";
import ReserveButton from "./ReserveButton";

interface CardClientProps {
  id: number;
  title: string;
  inWishlist: boolean;
  mode: "wishlist" | "reserve"; // 🔁 Nouvelle prop pour séparer les rôles
}

const CardClient = ({ id, title, inWishlist: initialWishlist, mode }: CardClientProps) => {
  const [inWishlist, setInWishlist] = useState(initialWishlist);
  const { isLoggedIn } = useAuth();

  useEffect(
    () => {
      setInWishlist(initialWishlist);
    },
    [initialWishlist]
  );

  const handleWishlistToggle = async () => {
    if (!isLoggedIn) {
      alert("Please log in to modify your wishlist.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const newStatus = !inWishlist;
      if (newStatus) {
        await api.post(`/wishlist/${id}`, null, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(`Added "${title}" to your wishlist!`);
      } else {
        await api.delete(`/wishlist/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(`Removed "${title}" from your wishlist.`);
      }

      setInWishlist(newStatus);
    } catch (err) {
      console.error("Wishlist update failed", err);
      toast.error("Failed to update wishlist.");
    }
  };

  if (mode === "wishlist" && isLoggedIn) {
    return <WishlistButton inWishlist={inWishlist} onToggle={handleWishlistToggle} />;
  }

  if (mode === "reserve") {
    return <ReserveButton onReserve={() => console.log(`Réservé pour "${title}"`)} title={title} />;
  }

  return null;
};

export default CardClient;
