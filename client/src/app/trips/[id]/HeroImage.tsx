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
  return (
    <div className="relative h-96 rounded-lg overflow-hidden shadow-lg mb-6">
      <Image src={imgSrc} alt={trip.title} fill style={{ objectFit: "cover" }} onError={() => setImgSrc(DEFAULT_IMAGE)} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-6 flex flex-col justify-end">
        <h1 className="text-4xl text-white font-bold">{trip.title}</h1>
        <div className="flex items-center text-white mt-2 space-x-4">
          <span className="flex items-center">
            <CalendarDays className="w-5 h-5 mr-1" />
            {new Date(trip.date).toLocaleDateString("fr-FR")}
          </span>
          <span className="flex items-center">
            <Eye className="w-5 h-5 mr-1" />
            {trip.views}
          </span>
        </div>
      </div>

      <PhotoProvider>
        <div className="p-2 relative gap-2 inset-0 flex justify-end items-center z-20">
          {trip.images.map((image, index) => (
            <PhotoView src={image.url} key={index}>
              <div className="rounded-md overflow-hidden shadow-lg mb-8 border-2 border-gray-200">
                <Image
                  src={image.url}
                  alt={`gallery-image-${index}`}
                  width={100}
                  height={60}
                  className="w-[100px] h-[60px] object-cover hover:cursor-zoom-in hover:scale-120 transition-transform duration-300 ease-in-out"
                />
              </div>
            </PhotoView>
          ))}
        </div>
      </PhotoProvider>
    </div>
  );
};

export default HeroImage;
