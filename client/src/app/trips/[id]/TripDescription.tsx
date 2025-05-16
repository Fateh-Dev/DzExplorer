import React from 'react';
import { Star, ShoppingCart, Phone } from 'lucide-react';
import { Trip } from './types';
 

interface Props {
  trip: Trip;
  isLoggedIn: boolean;
}

const TripDescription: React.FC<Props> = ({ trip, isLoggedIn }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-2">Description</h2>
      <p className="text-gray-700 mb-4" style={{ whiteSpace: 'pre-line' }}>
        {trip.description}
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <span className="font-semibold">Prix:</span> DZD {trip.price.toFixed(2)}
        </div>
        <div className="flex items-center">
          <span className="font-semibold mr-2">Évaluation:</span>
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-5 h-5 text-yellow-400`}
              fill="currentColor"
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">({trip.rating})</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-6">
        {isLoggedIn && (
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 rounded-md border border-cyan-900 text-cyan-900 hover:bg-cyan-100 cursor-pointer">
            <ShoppingCart size={18} /> Ajouter au panier
          </button>
        )}
        <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-cyan-900 text-white rounded-md hover:bg-cyan-800">
          <Phone size={18} /> Contacter : {trip.User?.profile?.contactNumber1 ?? 'N/A'}
        </button>
      </div>
    </div>
  );
};

export default TripDescription;
