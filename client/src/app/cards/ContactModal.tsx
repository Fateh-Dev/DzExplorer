"use client";

import { Dialog } from "@headlessui/react";
import { X, MessageSquare } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { NO_AVATAR_IMAGE } from "../constants";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactName: string;
  contactPhone1: string;
  contactPhone: string;
  image?: string;
  contactAreaOfWork: string;
  contactEmail: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  contactName,
  contactPhone,
  contactPhone1,
  image,
  contactAreaOfWork,
  contactEmail
}: ContactModalProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      {/* Centered panel */}
      <div className="flex min-h-screen items-center justify-center p-4">
        <Dialog.Panel className="relative w-full max-w-md rounded-xl bg-white p-6 shadow-xl ring-1 ring-black/10">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            aria-label="Close modal"
          >
            <X className="h-7 w-7 cursor-pointer" />
          </button>

          {/* Title */}
          <Dialog.Title className="mb-6 text-center text-2xl font-semibold text-gray-900">Informations de contact</Dialog.Title>

          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <Image
              src={imgSrc || NO_AVATAR_IMAGE}
              alt={`${contactName} photo`}
              width={150}
              height={150}
              className="rounded-full object-cover shadow-md"
              onError={() => setImgSrc(NO_AVATAR_IMAGE)}
            />
          </div>

          {/* Contact Details */}
          <div className="space-y-4 text-gray-700 text-base">
            <p>
              <span className="font-semibold">Nom:</span> {contactName}
            </p>
            <p>
              <span className="font-semibold">Téléphone 1:</span> {contactPhone}
            </p>
            <p>
              <span className="font-semibold">Téléphone 2:</span> {contactPhone1}
            </p>
            <p>
              <span className="font-semibold">Email:</span>{" "}
              <a href={`mailto:${contactEmail}`} className="text-cyan-600 hover:underline">
                {contactEmail}
              </a>
            </p>
            <p>
              <span className="font-semibold">Wilaya d&apos;activité:</span> {contactAreaOfWork}
            </p>
          </div>

          {/* Send Message Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => alert(`Message à ${contactName}`)}
              className="inline-flex items-center gap-2 rounded-md bg-cyan-600 px-4 py-2 text-white hover:bg-cyan-700 transition focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <MessageSquare className="w-5 h-5" />
              Envoyer un message
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
