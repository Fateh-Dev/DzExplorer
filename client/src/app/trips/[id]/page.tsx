"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Eye,
  MapPin,
  CalendarDays, 
  ShoppingCart,
  Phone 
} from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
 
 import { BASE_SERVER_URL, DEFAULT_IMAGE } from "../../constants";

export interface TripImage {
  id: number;
  url: string;
  isMain: boolean;
  createdAt: string;
  updatedAt: string;
  tripId: number;
}

export interface TripComment {
  id: number;
  description: string;
  rating: number;
  date: string; // format: YYYY-MM-DD
  time: string; // format: HH:MM:SS
  createdAt: string;
  updatedAt: string;
  userId: number;
  tripId: number;
}

export interface TripUser {
  id: number;
  username: string;
  email: string;
  profile: string | null;
}

export interface Trip {
  id: number;
  title: string;
  description: string;
  rating: number;
  image: string;
  thumbnail: string;
  price: number;
  date: string; // format: YYYY-MM-DD
  views: number;
  createdAt: string;
  updatedAt: string;
  userId: number;
  images: TripImage[];
  comments: TripComment[];
  User: TripUser;
}


const TripDetails = () => {
  const params = useParams();
  const id = params?.id;
  const [trip, setTrip] = useState<Trip | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imgSrc, setImgSrc] = useState("");
  const effectRan = useRef(false); 

  // Fonction pour ouvrir l'image
  

  useEffect(() => {
    if (!id || effectRan.current) return;

    const fetchTrip = async () => {
      try {
        const res = await fetch(`${BASE_SERVER_URL}/trips/${id}`);
        if (!res.ok) throw new Error("Trip not found");
        const data = await res.json();
        setTrip(data);
        setImgSrc(data.image);
      } catch {
        setError("Échec du chargement des détails du voyage");
      } finally {
        setLoading(false);
      }
    };

    fetchTrip();
    effectRan.current = true;
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Chargement...
      </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-600">{error || "Voyage non trouvé"}</p>
        <Link href="/" className="mt-4 text-cyan-900 hover:underline">
          Retour aux voyages
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Image with Wishlist Button */}
      <div className="relative h-96 rounded-lg overflow-hidden shadow-lg mb-8">
        <Image
          src={imgSrc} // Afficher la première image
          alt={trip.title}
          layout="fill"
          objectFit="cover"
          onError={() =>
            setImgSrc(
             DEFAULT_IMAGE
            )
          }
        />

        {/* Wishlist Button */}
         

        {/* Overlay Text */}
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

        {/* Image Viewer */}
        { (
          <PhotoProvider>
            <div className="p-2 relative gap-2 inset-0  flex justify-end items-center z-20 ">
              {/* Loop through all images */}
              {trip.images.map((image, index) => ( 
                <PhotoView src={image.url} key={index}>
                 <div className="rounded-md overflow-hidden shadow-lg mb-8 border-2 border-gray-200">
                  <Image
                    src={image.url}
                    alt={`gallery-image-${index}`}
                    width={100}
                    height={60}
                    className="cursor-pointer w-[100px] h-[60px] object-cover"
                  />
                </div>
                </PhotoView> 
              ))}
            </div>
          </PhotoProvider>
        )}
      </div>

      {/* Trip Description */}
      <div className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Description</h2>
        <p className="text-gray-700 mb-4"style={{ whiteSpace: 'pre-line' }}>
{trip.description}
</p> 

        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <span className="font-semibold">Prix:</span> DZD{" "}
            {trip.price.toFixed(2)}
          </div>
          <div className="flex items-center">
            <span className="font-semibold mr-2">Évaluation:</span>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  true
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill={true ? "currentColor" : "none"}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({trip.rating})</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-6">
          <button className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-5 py-2 rounded-md border border-cyan-900 text-cyan-900 hover:bg-cyan-100">
            <ShoppingCart size={18} /> Ajouter au panier
          </button>
          <button className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-5 py-2 bg-cyan-900 text-white rounded-md hover:bg-cyan-800">
            <Phone size={18} /> Contacter: +213 555 12 34 56
          </button>
        </div>
      </div>

      {/* Map */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800">
          <MapPin className="w-5 h-5" /> Localisation
        </h3>
        <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
          Carte de localisation ici (non implémentée)
        </div>
      </div>

      {/* Comments Section */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Commentaires</h3>
        <div className="space-y-6">
          {trip.comments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white p-4 rounded-md shadow-sm border border-gray-100"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold text-gray-800">
                  {comment.userId}
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(comment.date).toLocaleDateString("fr-FR")}
                </span>
              </div>
              <p className="text-gray-700">{comment.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Back Link */}
      <div className="text-center mt-10">
        <Link
          href="/"
          className="text-cyan-900 hover:underline text-lg font-medium"
        >
          ← Retour aux voyages
        </Link>
      </div>
    </div>
  );
};

export default TripDetails;
