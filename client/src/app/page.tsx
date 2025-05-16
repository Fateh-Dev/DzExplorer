import React from "react";
import api from "./lib/axios";
import { PAGE_SIZE } from "./constants";
import HomePageClient from "./components/HomePage/HomePageClient";

import type { Trip } from "./trips/[id]/types";

async function fetchTrips() {
  try {
    const res = await api.get("/trips/with-pagination", {
      params: { page: 1, limit: PAGE_SIZE }
    });
    return res.data.data; // assuming your API returns { data: [...] }
  } catch {
    return [];
  }
}

const HomePageServer = async () => {
  const initialTrips: Trip[] = await fetchTrips();

  return <HomePageClient initialTrips={initialTrips} />;
};

export default HomePageServer;
