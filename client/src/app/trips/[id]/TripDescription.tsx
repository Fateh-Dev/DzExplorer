// app/components/TripDescriptionServer.tsx
import { Trip } from "./types";
import ReserverButton from "./ReserverButton";
import { StarIcon } from "lucide-react";

interface Props {
  trip: Trip;
  isLoggedIn: boolean;
}

export default function TripDescriptionServer({ trip, isLoggedIn }: Props) {
  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Description</h2>
      <p className="text-gray-700 mb-4" style={{ whiteSpace: "pre-line" }}>
        {trip.description}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <span className="font-semibold  text-xl">Prix:</span> DZD {trip.price.toFixed(2)}
        </div>
        <div className="flex items-end">
          <span className="font-semibold mr-2 text-xl">Évaluation:</span>
          {/* {[...Array(5)].map((_, i) => (
            <span key={i} className="text-yellow-400">
              ★
            </span>
          ))} */}
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
              <StarIcon
                key={star}
                className={`cursor-pointer w-6 h-6 ${star <= trip.rating ? "text-yellow-400" : "text-gray-300"}`}
                fill={star <= trip.rating ? "currentColor" : "none"}
              />
            ))}
          </div>
          <span className="ml-2 text-sm text-gray-600 text-md">({trip.rating})</span>
        </div>
      </div>

      <ReserverButton trip={trip} isLoggedIn={isLoggedIn} />
    </div>
  );
}
