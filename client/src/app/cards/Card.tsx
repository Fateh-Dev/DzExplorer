import Image from "next/image";
import Link from "next/link";
import { EyeIcon, StarIcon } from "lucide-react";
import { DEFAULT_IMAGE } from "../constants";
import CardClient from "./CardClient";
import { User } from "../trips/[id]/types";

export interface CardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  User: User | undefined;
  inWishlist: boolean;
  onWishlistToggle: (id: number, inWishlist: boolean) => void;

  date: string; // ✅ nouvelle prop
  views: number; // ✅ nouvelle prop
  // reviewsCount: number; // ✅ nouvelle prop
}

const Card = ({ id, image, title, description, price, rating, inWishlist, User, date, views }: CardProps) => {
  return (
    <div className="relative  pb-2 group sm:w-full h-auto flex flex-col rounded-md bg-white shadow-lg overflow-hidden border-1 border-transparent hover:border-cyan-800">
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

        {/* ✅ Infos sur l'image */}
        <div className="flex items-center absolute bottom-[-10px] left-1 bg-black/80 text-white text-xs px-2 py-1 rounded-sm">
          <EyeIcon size={16} className="mr-2" /> {views}
        </div>
        <div className="absolute bottom-[-10px] right-1 bg-black/80 text-white text-xs px-2 py-1 rounded-sm">📅 {date}</div>
        <div className="absolute top-2 right-2 z-10">
          <CardClient id={id} title={title} inWishlist={inWishlist} mode="wishlist" />
        </div>
      </div>

      {/* Content */}
      <div className="top-2 flex flex-col justify-between flex-1 p-3 space-y-2 relative">
        <Link href={`/trips/${id}`} className="cursor-pointer">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{title}</h3>
            <p className="text-sm text-gray-600">
              {description && description.length > 50 ? `${description.slice(0, 50)}...` : description}
            </p>
          </div>
        </Link>

        {/* Price & Rating */}
        <div className="flex items-center justify-between z-0">
          <span className="text-md font-bold text-cyan-800">{price}</span>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
              <StarIcon
                key={star}
                className={`w-4 h-4 sm:w-4 sm:h-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                fill={star <= rating ? "currentColor" : "none"}
              />
            ))}
          </div>
        </div>

        {/* Hover Overlay Reserve Button */}
        <div className="absolute bottom-3 left-3 right-3 z-10 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out">
          <CardClient id={id} title={title} inWishlist={inWishlist} mode="reserve" contact={User} />
        </div>
      </div>
    </div>
  );
};

export default Card;
