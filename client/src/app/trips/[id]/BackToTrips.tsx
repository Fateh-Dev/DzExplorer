import React from "react";
import Link from "next/link";

const BackToTrips = () => (
  <Link href="/trips" className="inline-flex items-center mt-6 text-cyan-900 hover:underline">
    ← Retour aux voyages
  </Link>
);

export default BackToTrips;
