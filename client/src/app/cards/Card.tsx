"use client";
import { memo, useEffect, useState } from "react";
import { HeartIcon as SolidHeartIcon, StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import { DEFAULT_IMAGE } from "../constants";
import { useAuth } from "../context/authContext";
import api from "../lib/axios";
import toast from "react-hot-toast";
import Link from "next/link";
interface CardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  inWishlist: boolean;
  onWishlistToggle?: (id: number, inWishlist: boolean) => void; // New prop to sync with HomePage
}

const Card = ({
  id,
  image,
  title,
  description,
  price,
  rating,
  inWishlist: initialWishlistStatus,
  onWishlistToggle,
}: CardProps) => {
  const [inWishlist, setInWishlist] = useState(initialWishlistStatus);
  const { isLoggedIn } = useAuth();

  // Sync local inWishlist with prop
  useEffect(() => {
    setInWishlist(initialWishlistStatus);
  }, [initialWishlistStatus]);

  // Debugging: Log re-renders
  useEffect(() => {
    console.log(`Card ${id} rendered with image: ${image}`);
  });

  const handleWishlistToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      alert("Please log in to modify your wishlist.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      const newWishlistStatus = !inWishlist;
      if (newWishlistStatus) {
        await api.post(`/wishlist/${id}`, null, {
          headers: { Authorization: `Bearer ${token}` },
        });
         toast.success(`Added "${title}" to your wishlist!`);
      } else {
        await api.delete(`/wishlist/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
         toast.success(`Removed "${title}" from your wishlist.`);
      }

      setInWishlist(newWishlistStatus);
      onWishlistToggle?.(id, newWishlistStatus); // Notify HomePage
    } catch (err) {
      console.error("Failed to update wishlist", err);
  toast.error("Failed to update wishlist. Please try again.");
    }
  };

  return (
    <div className="relative sm:w-full h-auto flex flex-col rounded-md bg-white shadow-lg overflow-hidden border-1 border-transparent hover:border-cyan-800">
      {/* Image */}
      <div className="relative w-full h-36">
      <Link href={`/trips/${id}`}className="  cursor-pointer" prefetch={false} > 
      <Image
          src={image}
          alt={title}
          width={300} // Match your design
          height={144} // Matches h-36 (9rem = 144px)
          className="object-cover w-full h-full"
          placeholder="blur"
          blurDataURL="/blur-placeholder.png"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_IMAGE; // Fallback without state
          }}
          quality={80} // Balance quality and performance
        />
        </Link> 
        {isLoggedIn && (
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-2 right-2 rounded-full p-1 transition ${
              inWishlist
                ? "bg-red-500 text-white"
                : "bg-white/80 text-gray-800 hover:bg-red-500 hover:text-white"
            }`}
          >
            {inWishlist ? (
              <SolidHeartIcon className="h-5 w-5 cursor-pointer" />
            ) : (
              <OutlineHeartIcon className="h-5 w-5 cursor-pointer" />
            )}
          </button>
        )}
      </div>

      {/* Content */}
      
      <div className="flex flex-col justify-between flex-1 p-4 space-y-2">
      <Link href={`/trips/${id}`} className="cursor-pointer" prefetch={false} > 
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
            {title}
          </h3>
          <p className="text-sm text-gray-600">
            {description.length > 90
              ? `${description.slice(0, 90)}...`
              : description}
          </p>
        </div>
</Link>
        {/* Bottom section */}
        <div className="mt-4 space-y-2">
          {/* Price & Rating */}
          <div className="flex items-center justify-between">
            <span className="text-md font-bold text-cyan-800">{price}</span>
            <div className="flex items-center space-x-1">
              {Array.from({ length: rating }).map((_, idx) => (
                <StarIcon key={idx} className="w-4 h-4 text-yellow-400" />
              ))}
              {Array.from({ length: 5 - rating }).map((_, idx) => (
                <StarIcon key={idx} className="w-4 h-4 text-gray-300" />
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex space-x-2">
            <button
              className="flex-1 px-4 py-2 bg-cyan-900 text-white text-sm font-medium rounded-md hover:bg-cyan-800 transition cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                // Add reservation logic here
                alert(`Reserved "${title}"!`);
              }}
            >
              Réserver
            </button>
            {isLoggedIn && (
              <button
                className="w-1/5 px-4 py-2 bg-orange-400 text-white text-sm font-medium rounded-md hover:bg-cyan-800 transition cursor-pointer"
                onClick={() => alert(`Added "${title}" to cart!`)}
              >
                <ShoppingCart size={20} className="mx-auto" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Card, (prevProps, nextProps) => {
  return (
    prevProps.id === nextProps.id &&
    prevProps.image === nextProps.image &&
    prevProps.title === nextProps.title &&
    prevProps.description === nextProps.description &&
    prevProps.price === nextProps.price &&
    prevProps.rating === nextProps.rating &&
    prevProps.inWishlist === nextProps.inWishlist
  );
});