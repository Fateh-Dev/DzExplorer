import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { DEFAULT_IMAGE } from "../constants";
import CardClient from "./CardClient";

interface CardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  inWishlist: boolean;
}

const Card = ({ id, image, title, description, price, rating, inWishlist }: CardProps) => {
  return (
    <div className="relative sm:w-full h-auto flex flex-col rounded-md bg-white shadow-lg overflow-hidden border-1 border-transparent hover:border-cyan-800">
      {/* Image + Wishlist */}
      <div className="relative w-full h-36">
        <Link href={`/trips/${id}`} className="cursor-pointer">
          <Image
            src={image}
            alt={title}
            width={300}
            height={144}
            className="object-cover w-full h-full"
            placeholder="blur"
            blurDataURL="/blur-placeholder.png"
            onError={e => {
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
            quality={80}
          />
        </Link>

        {/* Wishlist button in corner (handled by client) */}
        <div className="absolute top-2 right-2 z-10">
          <CardClient id={id} title={title} inWishlist={inWishlist} mode="wishlist" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between flex-1 p-3 space-y-2">
        <Link href={`/trips/${id}`} className="cursor-pointer">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-600">{description.length > 50 ? `${description.slice(0, 50)}...` : description}</p>
          </div>
        </Link>

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

        {/* Reserve button handled by client */}
        <CardClient id={id} title={title} inWishlist={inWishlist} mode="reserve" />
      </div>
    </div>
  );
};

export default Card;
