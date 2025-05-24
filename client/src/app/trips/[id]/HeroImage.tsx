import React from "react";
import Image from "next/image";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { CalendarDays, Eye } from "lucide-react";
import { DEFAULT_IMAGE } from "../../constants";
import { Trip } from "./types";

interface Props {
  trip: Trip;
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string>>;
}

const HeroImage: React.FC<Props> = ({ trip, imgSrc, setImgSrc }) => {
  // Add safety checks and filtering
  const validImages = (trip?.images || []).filter(image => 
    image && 
    typeof image === 'object' && 
    image.url && 
    typeof image.url === 'string'
  );

  return (
    <div className="relative h-96 rounded-lg overflow-hidden shadow-lg mb-6">
      <Image 
        src={imgSrc} 
        alt={trip?.title || "Trip image"} 
        fill 
        style={{ objectFit: "cover" }} 
        onError={() => setImgSrc(DEFAULT_IMAGE)} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
        <h1 className="text-4xl text-white font-bold">{trip?.title || "Untitled Trip"}</h1>
        <div className="flex items-center text-white mt-2 space-x-4">
          <span className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-1" />
            {trip?.date ? new Date(trip.date).toLocaleDateString("fr-FR") : "Date not available"}
          </span>
          <span className="flex items-center">
            <Eye className="w-5 h-5 mr-1" />
            {trip?.views || 0}
          </span>
        </div>
      </div>

      {/* Only render PhotoProvider if there are valid images */}
      {validImages.length > 0 && (
        <PhotoProvider>
          <div className="p-2 relative gap-2 inset-0 flex justify-end items-center z-20">
            {validImages.map((image, index) => (
              <PhotoView src={image.url} key={image.id || index}>
                <div className="rounded-md overflow-hidden shadow-lg mb-8 border-2 border-gray-200">
                  <Image
                    src={image.url}
                    alt={image.caption || `gallery-image-${index}`}
                    width={100}
                    height={60}
                    className="w-[100px] h-[60px] object-cover hover:cursor-zoom-in hover:scale-120 transition-transform duration-300 ease-in-out"
                    onError={(e) => {
                      // Handle individual image load errors
                      e.currentTarget.src = DEFAULT_IMAGE;
                    }}
                  />
                </div>
              </PhotoView>
            ))}
          </div>
        </PhotoProvider>
      )}
    </div>
  );
};

export default HeroImage;