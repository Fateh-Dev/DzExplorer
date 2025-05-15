"use client";
import React, { useState, useEffect } from "react";
import Card from "./cards/Card";
import { ArrowUp, Search, RefreshCcw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { NO_TRIP_IMAGE, PAGE_SIZE } from "./constants";
import api from "./lib/axios";
import { useAuth } from "./context/authContext"; // make sure this exists
interface Trip {
  id: number;
  title: string;
  description: string;
  rating: number;
  image: string;
  date: string;
  views: number;
  thumbnail: string;
  price: number;
  createdAt: string;
  updatedAt: string;
}

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [data, setData] = useState<Trip[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const { isLoggedIn } = useAuth(); // track login
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  // Fetch wishlist only once
  const fetchWishlist = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await api.get("/wishlist", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const wishlist: { id: number }[] = res.data;
      const ids = wishlist.map(item => item.id);
      setWishlistIds(ids);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
    }
  };

  useEffect(
    () => {
      if (isLoggedIn) {
        fetchWishlist();
      } else {
        setWishlistIds([]);
      }
    },
    [isLoggedIn]
  );
  const fetchData = async (pageNumber = 1) => {
    setIsLoading(true); // Set loading to true before fetching
    try {
      const params = new URLSearchParams({
        page: pageNumber.toString(),
        limit: PAGE_SIZE.toString()
      });

      if (searchQuery) params.append("search", searchQuery);
      if (startDate) params.append("startDate", startDate);
      if (endDate) params.append("endDate", endDate);

      const res = await api.get("/trips/with-pagination", { params, withCredentials: false });
      const result = res.data;

      if (result.data.length < PAGE_SIZE) {
        setHasMore(false);
      }

      if (pageNumber === 1) {
        setData(result.data);
      } else {
        setData(prev => [...prev, ...result.data]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false); // Set loading to false after fetching
    }
  };

  useEffect(
    () => {
      setPage(1);
      setHasMore(true);
      fetchData(1);
    },
    [searchQuery, startDate, endDate]
  );

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowGoToTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="mx-auto w-full max-w-7xl py-4 relative">
      {/* Search Inputs */}
      <div className="mb-6 flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
        <div className="relative w-full sm:w-4/6">
          <input
            type="text"
            placeholder="Search by title or description..."
            className="w-full p-3 pr-10 border border-gray-300 rounded-md shadow-md bg-white"
            value={searchQueryInput}
            onChange={e => setSearchQueryInput(e.target.value)}
            onKeyDown={e => {
              if (e.key === "Enter") {
                setSearchQuery(searchQueryInput);
              }
            }}
          />
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setSearchQuery(searchQueryInput)}
          >
            <Search size={18} />
          </button>
        </div>
        <input
          type="date"
          className="w-full sm:w-1/6 p-3 border border-gray-300 rounded-md shadow-md bg-white"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="w-full sm:w-1/6 p-3 border border-gray-300 rounded-md shadow-md bg-white"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>

      {/* Loading State */}
      {isLoading ? (
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
          <p className="text-lg">Loading trips...</p>
        </div>
      ) : data.length === 0 ? (
        /* No Trips Found */
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <Image src={NO_TRIP_IMAGE} alt="No trips found" width={192} height={192} className="mb-4 opacity-80" />
          <p className="text-lg">No trips found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
            {data.map((trip, index) => (
              <Link href={`/trips/${trip.id}`} key={trip.id} className="flex cursor-pointer">
                <Card
                  key={index}
                  id={trip.id}
                  image={trip.image}
                  title={trip.title}
                  description={trip.description}
                  price={"DZD " + trip.price.toFixed(2)}
                  rating={trip.rating}
                  inWishlist={wishlistIds.includes(trip.id)} // 👈 new prop
                />
              </Link>
            ))}
          </div>
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-900 text-cyan-900 rounded-md hover:bg-cyan-100 cursor-pointer"
                disabled={isLoading} // Disable button while loading
              >
                <RefreshCcw size={18} />
                Load More
              </button>
            </div>
          )}
        </>
      )}

      {/* Go to Top Button */}
      {showGoToTop && (
        <button
          onClick={handleGoToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-cyan-900 text-white rounded-full shadow-lg hover:bg-cyan-700 transition border-2 border-white"
          aria-label="Go to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default HomePage;
