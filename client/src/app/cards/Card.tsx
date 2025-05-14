"use client";
import { HeartIcon, StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useState } from "react";
import { ShoppingCart } from "lucide-react";
const Card = ({
  image,
  title,
  description,
  price,
  rating
}: {
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
}) => {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <div className="relative   sm:w-full h-auto flex flex-col rounded-md bg-white shadow-lg overflow-hidden hover:border-cyan-800 hover:border-1">
      {/* Image */}
      <div className="relative w-full h-36">
        <Image
          src={imgSrc}
          alt={title}
          layout="fill"
          className="object-cover"
          onError={() =>
            setImgSrc(
              "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80"
            )
          }
        />
        {/* Favorite Icon */}
        <button className="absolute top-2 right-2 rounded-full bg-white/80 p-1 hover:bg-red-500 hover:text-white transition">
          <HeartIcon className="h-5 w-5  " />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-4 space-y-2">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-600">{description.length > 90 ? `${description.slice(0, 90)}...` : description}</p>
        </div>

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

          {/* Add to Cart Button */}
          <div className="flex space-x-2">
            <button
              className="flex-1 px-4 py-2 bg-cyan-900 text-white text-sm font-medium rounded-md hover:bg-cyan-800 transition cursor-pointer"
              onClick={() => alert(`Added "${title}" to cart!`)}
            >
              Réserver
            </button>
            <button
              className="w-1/5 px-4 py-2 bg-orange-400 text-white text-sm font-medium rounded-md hover:bg-cyan-800 transition cursor-pointer"
              onClick={() => alert(`Added "${title}" to cart!`)}
            >
              <ShoppingCart size={20} className="mr-2" /> {/* Display the icon */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
