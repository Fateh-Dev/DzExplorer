"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import api from "../lib/axios";
import WishlistButton from "./WishlistButton";
import ReserveButton from "./ReserveButton";
import ContactModal from "./ContactModal";
import { User } from "../trips/[id]/types";
import { NO_AVATAR_IMAGE } from "../constants";

interface CardClientProps {
  id: number;
  title: string;
  inWishlist: boolean;
  mode: "wishlist" | "reserve";
  contact?: User;
}

const CardClient = ({ id, title, inWishlist: initialWishlist, mode, contact }: CardClientProps) => {
  const [inWishlist, setInWishlist] = useState(initialWishlist);
  const { isLoggedIn } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);

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
    return (
      <>
        <ReserveButton
          onReserve={() => {
            if (!contact) {
              toast.error("Contact information not available.");
              return;
            }
            setModalOpen(true);
          }}
          title={title}
          display="Réserver"
        />

        {contact && (
          <ContactModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            contactName={contact?.profile?.name || "Unknown"}
            contactPhone={contact?.profile?.contactNumber1 || "Unknown"}
            contactPhone1={contact?.profile?.contactNumber2 || "Unknown"}
            contactEmail={contact?.email || "Unknown"}
            image={contact?.profile?.image || NO_AVATAR_IMAGE}
            contactAreaOfWork={contact?.profile?.areaOfWork || "Unknown"}
          /> 
        )}
      </>
    );
  }

  return null;
};

export default CardClient;
