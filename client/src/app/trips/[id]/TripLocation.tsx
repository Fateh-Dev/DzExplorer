import React from "react";
import { MapPin } from "lucide-react";

const TripLocation = () => (
  <fieldset className="mt-6 border border-gray-300 rounded-md p-4">
    <legend className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800 px-2">
      <MapPin className="w-5 h-5" /> Localisation
    </legend>
    <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
      Carte de localisation ici (non implémentée)
    </div>
  </fieldset>
);

export default TripLocation;
