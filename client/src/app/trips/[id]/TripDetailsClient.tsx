"use client";
import React, { useEffect, useState } from "react";
import "react-photo-view/dist/react-photo-view.css";
import toast from "react-hot-toast";
import api from "@/app/lib/axios";
import { useAuth } from "@/app/context/authContext";
import { Trip } from "./types";
import HeroImage from "./HeroImage";
import TripDescription from "./TripDescription";
import TripLocation from "./TripLocation";
import TripComments from "./TripComments";
import BackToTrips from "./BackToTrips";
import { DEFAULT_IMAGE } from "@/app/constants";

interface Props {
  trip: Trip;
}

const TripDetailsClient: React.FC<Props> = ({ trip }) => {
  const { isLoggedIn } = useAuth();
  const [imgSrc, setImgSrc] = useState(trip.image);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [comments, setComments] = useState(trip.comments);

  const handleCommentSubmit = async () => {
    if (!newComment || newRating < 1 || newRating > 5) return;
    try {
      setSubmitting(true);
      await api.post(`/comments/${trip.id}`, {
        description: newComment,
        rating: newRating
      });
      const res = await api.get(`/comments/${trip.id}`);
      setComments(res.data);
      setNewComment("");
      setNewRating(0);
      toast.success("Comment submitted successfully!");
    } catch {
      toast.error("Failed to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(
    () => {
      const key = `viewed-trip-${trip.id}`;
      const lastViewed = localStorage.getItem(key);
      const now = Date.now();

      if (!lastViewed || now - Number(lastViewed) > 60 * 60 * 1000) {
        api.post(`/trips/view/${trip.id}`);
        localStorage.setItem(key, now.toString());
      }
    },
    [trip.id]
  );

  return (
    <div className="w-full">
      <HeroImage imgSrc={imgSrc || DEFAULT_IMAGE} setImgSrc={setImgSrc} trip={trip} />
      <TripDescription trip={trip} isLoggedIn={isLoggedIn} />
      <TripLocation />
      <TripComments
        comments={comments || []}
        isLoggedIn={isLoggedIn}
        newComment={newComment}
        setNewComment={setNewComment}
        newRating={newRating}
        setNewRating={setNewRating}
        submitting={submitting}
        handleCommentSubmit={handleCommentSubmit}
      />
      <BackToTrips />
    </div>
  );
};

export default TripDetailsClient;
