import Image from "next/image";
import Link from "next/link";
import { StarIcon } from "lucide-react";
import { DEFAULT_IMAGE } from "../constants";
import { User } from "../trips/[id]/types";

export interface WideCardProps {
  id: number;
  image: string;
  title: string;
  description: string;
  price: string;
  rating: number;
  User?: User;
}

const WideCard = ({ id, image, title, description, price, rating }: WideCardProps) => {
  return (
    <div className="flex bg-white shadow-md rounded-xl overflow-hidden border border-gray-200 hover:border-cyan-800 transition">
      {/* Image */}
      <div className="relative w-55 h-40 flex-shrink-0">
        <Link href={`/trips/${id}`}>
          <Image
            src={image || DEFAULT_IMAGE}
            alt={title}
            fill
            className="object-cover"
            onError={e => {
              e.currentTarget.src = DEFAULT_IMAGE;
            }}
            quality={80}
          />
        </Link>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-4 w-full">
        {/* Top */}
        <div className="flex justify-between items-start">
          <div>
            <Link href={`/trips/${id}`}>
              <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
            </Link>
            <p className="text-sm text-gray-600">
              {description && description.length > 1000 ? `${description.slice(0, 1000)}...` : description}
            </p>
          </div>

          {/* Rating */}
          <div className="flex flex-col items-end ml-4 min-w-[80px]">
            <span className="text-sm font-medium text-gray-600 mb-1">Rating</span>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <StarIcon
                  key={star}
                  className={`w-4 h-4 ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill={star <= rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="flex justify-end mt-4">
          <span className="text-lg font-bold text-cyan-800">{price} €</span>
        </div>
      </div>
    </div>
  );
};

export default WideCard;
