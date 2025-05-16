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
  Phone,  
  LayoutPanelTop
} from "lucide-react";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
 
 import {  DEFAULT_IMAGE } from "../../constants";
import api from "@/app/lib/axios";
import { useAuth } from "@/app/context/authContext";
import toast from "react-hot-toast";

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
  User: TripUser;
}

export interface TripUser {
  id: number;
  username: string;
  email: string;
  profile: UserProfile | null;
}
export interface UserProfile {
  areaOfWork: string;
  contactNumber1: string;
  contactNumber2: string;
  name: string | null; 
 
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
  const { isLoggedIn } = useAuth();
  // Fonction pour ouvrir l'image
  const [newComment, setNewComment] = useState("");
const [newRating, setNewRating] = useState(0);
const [submitting, setSubmitting] = useState(false);
const handleCommentSubmit = async () => {
  if (!newComment || newRating < 1 || newRating > 5) return;

  try {
    setSubmitting(true);
    // Post comment to /comments/:tripId
    await api.post(`/comments/${id}`, {
      description: newComment,
      rating: newRating,
    });

    // Fetch updated comments only
    const res = await api.get(`/comments/${id}`);
    setTrip(prev => prev ? { ...prev, comments: res.data } : prev);

    setNewComment("");
    setNewRating(0);
      toast.success("Comment submitted successfully!", {
  className: "bg-emerald-600 text-white px-4 py-3 rounded-md shadow-md border-l-12 border-green-600",
  iconTheme: {
    primary: "#ffffff",     // Icon color
    secondary: "#065f46",   // Background behind icon (Tailwind emerald-800)
  },
});  // Success toast
  } catch (err) {
    console.error("Erreur lors de l'envoi du commentaire", err);
    toast.error("Failed to submit comment. Please try again.", {
      className: "bg-orange-300 text-white px-4 py-3 rounded-md shadow-md border-l-12 border-red-600",
      iconTheme: {
        primary: "#ffffff",
        secondary: "#b91c1c", // Tailwind red-700
      },
    });
    
  } finally {
    setSubmitting(false);
  }
};


  useEffect(() => {
    if (!id || effectRan.current) return;

   const fetchTrip = async () => {
  try {
    const res = await api.get(`/trips/details/${id}`, {  withCredentials: false });
    setTrip(res.data);
    setImgSrc(res.data.image);
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
      // <div className="min-h-screen flex justify-center items-center">
      //   Chargement...
      // </div>
       <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <svg
            className="animate-spin h-10 w-10 text-cyan-900 mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <p className="text-lg">Loading trip detalis...</p>
        </div>
    );
  }

  if (error || !trip) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-600">{error || "Voyage non trouvé"}</p>
        <Link
          href="/"
          className="text-cyan-900  text-lg font-medium"
        >   <button 
                className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-900 text-cyan-900 rounded-md hover:bg-cyan-100 cursor-pointer"
             
                aria-label="Load more trips"
              > <LayoutPanelTop />
                {/* <RefreshCcw size={18} />   */}
                       Retour aux voyages
              </button></Link> 
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Image with Wishlist Button */}
      <div className="relative h-96 rounded-lg overflow-hidden shadow-lg mb-6">
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
                    className="w-[100px] h-[60px] object-cover hover:cursor-zoom-in hover:scale-120 transition-transform duration-300 ease-in-out"
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
          {isLoggedIn && (   <button className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-5 py-2 rounded-md border border-cyan-900 text-cyan-900 hover:bg-cyan-100">
            <ShoppingCart size={18} /> Ajouter au panier
          </button>)}
          <button className="w-full sm:w-auto cursor-pointer flex items-center justify-center gap-2 px-5 py-2 bg-cyan-900 text-white rounded-md hover:bg-cyan-800">
            <Phone size={18} /> Contacter : {trip.User?.profile?.contactNumber1 ?? "N/A"}
          </button>
        </div>
      </div>

      {/* Map */}
     <fieldset className="mt-6 border border-gray-300 rounded-md p-4">
  <legend className="text-xl font-semibold mb-3 flex items-center gap-2 text-gray-800 px-2">
    <MapPin className="w-5 h-5" /> Localisation
  </legend>
  <div className="w-full h-64 bg-gray-100 rounded-md flex items-center justify-center text-gray-400">
    Carte de localisation ici (non implémentée)
  </div>
</fieldset>


     <fieldset className="mt-6 border border-gray-300 rounded-md p-4">
  <legend className="text-xl font-semibold text-gray-800 px-2">Commentaires</legend>
{isLoggedIn && (
  <div className="mb-4" >
    <h4 className="text-lg font-medium text-gray-800 mb-2">Laisser un commentaire</h4>
    
    <textarea
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      rows={3}
      placeholder="Écrivez votre commentaire ici..."
      className="w-full p-2 border-2 border-gray-200 rounded-md focus:outline-none focus:ring focus:border-cyan-500"
    />

    <div className="flex items-center gap-2 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          onClick={() => setNewRating(star)}
          className={`cursor-pointer w-6 h-6 ${
            star <= newRating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill={star <= newRating ? "currentColor" : "none"}
        />
      ))}
    </div>

    <button
      onClick={handleCommentSubmit}
      disabled={submitting}
      className="mt-4 px-4 py-2 bg-cyan-900 text-white rounded-md hover:bg-cyan-800 disabled:opacity-50"
    >
      {submitting ? "Envoi en cours..." : "Envoyer"}
    </button>
  </div>
)}

  {trip.comments.length > 0 ? (
    <div className="space-y-3">
      {trip.comments.map((comment) => (
       <div
  key={comment.id}
  className="bg-white p-4 rounded-md shadow-sm border border-gray-100"
>
  <div className="flex justify-between items-center mb-2">
    <span className="font-semibold text-gray-800">
      {comment.User?.username ?? "Utilisateur"}
    </span>

    <div className="flex items-center space-x-3">
      <span className="text-sm text-gray-500">
        {new Date(comment.createdAt).toLocaleDateString("fr-FR")}
      </span>

      {/* Rating stars aligned right */}
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < comment.rating ? "text-yellow-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.963a1 1 0 00.95.69h4.18c.969 0 1.371 1.24.588 1.81l-3.385 2.46a1 1 0 00-.364 1.118l1.287 3.964c.3.92-.755 1.688-1.54 1.118l-3.386-2.46a1 1 0 00-1.175 0l-3.386 2.46c-.785.57-1.838-.197-1.54-1.118l1.287-3.964a1 1 0 00-.364-1.118L2.044 9.39c-.783-.57-.38-1.81.588-1.81h4.18a1 1 0 00.95-.69l1.287-3.963z" />
          </svg>
        ))}
      </div>
    </div>
  </div>
  
  <p className="text-gray-700">{comment.description}</p>
</div>

      ))}
    </div>
  ) : (
    <p className="text-gray-500 italic text-center pb-6">
      Il n&apos;y a pas encore de commentaires.
      </p>
  )}
</fieldset>


      {/* Back Link */}
       <div className="flex justify-center mt-6">
            <Link
          href="/"
          className="text-cyan-900  text-lg font-medium"
        >   <button 
                className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-900 text-cyan-900 rounded-md hover:bg-cyan-100 cursor-pointer"
             
                aria-label="Load more trips"
              > <LayoutPanelTop />
                {/* <RefreshCcw size={18} />   */}
                       Retour aux voyages
              </button></Link> 
            </div>  
      
    </div>
  );
};

export default TripDetails;
