import { Trip } from "./types";
import ReserverButton from "./ReserverButton";
import { StarIcon } from "lucide-react";

interface Props {
  trip: Trip;
  isLoggedIn: boolean;
}

export default function TripDescriptionServer({ trip, isLoggedIn }: Props) {
  return (
    <div className="bg-white shadow-md rounded-md p-6 relative">
      {/* Top Row: Title + Rating + Contact */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2 sm:mb-0">Description</h2>

        <div className="flex flex-col sm:items-end space-y-2">
          {/* Rating */}
          <div className="flex items-center">
            <span className="font-semibold mr-2 text-md sm:text-lg">Évaluation:</span>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map(star => (
                <StarIcon
                  key={star}
                  className={`w-5 h-5 sm:w-6 sm:h-6 ${star <= trip.rating ? "text-yellow-400" : "text-gray-300"}`}
                  fill={star <= trip.rating ? "currentColor" : "none"}
                />
              ))}
            </div>
            <span className="ml-2 text-sm text-gray-600">({trip.rating})</span>
          </div>

          {/* Contact Button */}
        </div>
      </div>

      {/* Description Text */}
      <p className="text-gray-700 mb-4" style={{ whiteSpace: "pre-line" }}>
        {trip.description}
      </p>

      {/* Price */}
      <div className="text-xl font-semibold text-gray-800">
        Prix: <span className="text-cyan-700">DZD {trip.price.toFixed(2)}</span>
      </div>
      <ReserverButton trip={trip} isLoggedIn={isLoggedIn} />
    </div>
  );
}
