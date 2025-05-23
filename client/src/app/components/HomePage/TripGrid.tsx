import React from "react";
import Card from "../../cards/Card";
import { Trip } from "@/app/trips/[id]/types";
import { DEFAULT_IMAGE } from "@/app/constants";

interface Props {
  data: Trip[];
  wishlistMap: Map<number, boolean>;
  handleWishlistToggle: (id: number, inWishlist: boolean) => void;
}

const TripGrid: React.FC<Props> = ({ data, wishlistMap, handleWishlistToggle }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 cursor-pointer">
    {data.map(trip => (
      <Card
        key={trip.id}
        id={trip.id}
        image={trip.image || DEFAULT_IMAGE}
        title={trip.title}
        description={trip.description}
        price={trip.price.toFixed(2) + " DA"}
        rating={trip.rating}
        User={trip.User}
        inWishlist={wishlistMap.get(trip.id) || false}
        onWishlistToggle={handleWishlistToggle}
        date={trip.date}
        views={trip.views}
      />
    ))}
  </div>
);

export default TripGrid;
