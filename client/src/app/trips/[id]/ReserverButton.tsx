'use client';

import { useState } from 'react';
import { Trip } from './types';
import { NO_AVATAR_IMAGE } from '@/app/constants';
import ContactModal from '@/app/cards/ContactModal';
import ReserveButton from '@/app/cards/ReserveButton';
import toast from 'react-hot-toast';

interface Props {
  trip: Trip;
  isLoggedIn: boolean;
}

export default function ReserverButton({ trip }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  const handleReserve = () => {
    if (!trip.User) {
      toast.error("Contact information not available.");
      return;
    }
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col sm:flex-row sm:justify-end sm:space-x-2 gap-2 mt-6">
      <div className="w-md">
        <ReserveButton
          onReserve={handleReserve}
          title={trip.title}
          display="Informations de contact"
        />

        {trip.User && (
          <ContactModal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            contactName={trip.User?.profile?.name || "Unknown"}
            contactPhone={trip.User?.profile?.contactNumber1 || "Unknown"}
            contactPhone1={trip.User?.profile?.contactNumber2 || "Unknown"}
            contactEmail={trip.User?.email || "Unknown"}
            image={trip.User?.profile?.image || NO_AVATAR_IMAGE}
            contactAreaOfWork={trip.User?.profile?.areaOfWork || "Unknown"}
          />
        )}
      </div>
    </div>
  );
}
