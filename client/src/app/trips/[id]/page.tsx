// app/trips/[id]/page.tsx or similar (server component by default)

import TripDetailsClient from "./TripDetailsClient"; // client
import { getTrip } from "@/app/lib/trips";

// export async function getTrip(id: string): Promise<Trip | null> {
//   try {
//     const response = await api.get<Trip>(`/trips/details/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching trip:", error);
//     return null;
//   }
// }
type PageProps = {
  params: Promise<{ id: string }>; // Note the Promise type
};

export default async function TripDetailsPage({ params }: PageProps) {
  const { id } = await params; // Await the params Promise
  const trip = await getTrip(id);
  if (!trip) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-red-600">Voyage non trouvé ou erreur de chargement</p>
        {/* back button as in your original */}
      </div>
    );
  }

  return <TripDetailsClient trip={trip} />;
}
