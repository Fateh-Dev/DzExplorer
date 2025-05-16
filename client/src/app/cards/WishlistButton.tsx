"use client";
import { useState, useEffect } from "react";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";

interface WishlistButtonProps {
  inWishlist: boolean;
  onToggle: () => void;
}

export default function WishlistButton({ inWishlist, onToggle }: WishlistButtonProps) {
  const [explode, setExplode] = useState(false);

  useEffect(
    () => {
      if (explode) {
        const timeout = setTimeout(() => setExplode(false), 500);
        return () => clearTimeout(timeout);
      }
    },
    [explode]
  );

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggle();
    setExplode(true);
  };

  return (
    <div className="relative z-20">
      {explode && (
        <div className="absolute inset-0 z-10 flex items-center justify-center animate-bomb">
          <div className="h-10 w-10 rounded-full bg-red-500 opacity-70 blur-lg scale-100" />
        </div>
      )}

      <button
        onClick={handleClick}
        title={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
        className={`rounded-full p-1 transition ${
          inWishlist ? "bg-red-500 text-white" : "bg-white/80 text-gray-800 hover:bg-red-500 hover:text-white"
        }`}
      >
        {inWishlist ? (
          <SolidHeartIcon className="h-6 w-6 transition-transform duration-200 group-hover:scale-110" />
        ) : (
          <OutlineHeartIcon className="h-6 w-6" />
        )}
      </button>

      <style jsx>{`
        @keyframes bomb {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(2.5);
            opacity: 0.7;
          }
          100% {
            transform: scale(0);
            opacity: 0;
          }
        }

        .animate-bomb {
          animation: bomb 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
