// app/trips/[id]/page.tsx or similar (server component by default)

import api from "@/app/lib/axios";
import TripDetailsClient from "./TripDetailsClient"; // client component
import { Trip } from "./types";

interface Props {
  params: { id: string };
}

export async function getTrip(id: string): Promise<Trip | null> {
  try {
    const response = await api.get<Trip>(`/trips/details/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trip:", error);
    return null;
  }
}

const TripDetailsPage = async ({ params }: Props) => {
  const trip = await getTrip(params.id);

  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-600">Voyage non trouvé ou erreur de chargement</p>
        {/* back button as in your original */}
      </div>
    );
  }

  return <TripDetailsClient trip={trip} />;
};

export default TripDetailsPage;
