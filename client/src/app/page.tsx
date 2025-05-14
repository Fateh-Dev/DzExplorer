"use client";
import React, { useState, useEffect } from "react";
import Card from "./cards/Card";
import { ArrowUp, Search, RefreshCcw } from "lucide-react";

import Link from "next/link";
import Image from "next/image";
import { BASE_SERVER_URL, PAGE_SIZE } from "./constants";
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

  const fetchData = async (pageNumber = 1) => {
    const params = new URLSearchParams({
      page: pageNumber.toString(),
      limit: PAGE_SIZE.toString()
    });

    if (searchQuery) params.append("search", searchQuery);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const res = await fetch(`${BASE_SERVER_URL}/trips-with-pagination?${params.toString()}`);
    const result = await res.json();

    if (result.data.length < PAGE_SIZE) {
      setHasMore(false);
    }

    if (pageNumber === 1) {
      setData(result.data);
    } else {
      setData(prev => [...prev, ...result.data]);
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
        {/* Search Input with Icon */}
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

        {/* Start Date */}
        <input
          type="date"
          className="w-full sm:w-1/6 p-3 border border-gray-300 rounded-md shadow-md bg-white"
          value={startDate}
          onChange={e => setStartDate(e.target.value)}
        />

        {/* End Date */}
        <input
          type="date"
          className="w-full sm:w-1/6 p-3 border border-gray-300 rounded-md shadow-md bg-white"
          value={endDate}
          onChange={e => setEndDate(e.target.value)}
        />
      </div>

      {/* Cards Grid */}
      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
          <Image
            src="/notrip.png"
            alt="No trips found"
            width={192} // equivalent to w-48
            height={192} // equivalent to h-48
            className="mb-4 opacity-80"
          />
          <p className="text-lg">No trips found.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 cursor-pointer">
            {data.map((trip, index) => (
              <Link href={`/trips/${trip.id}`} key={trip.id} className="flex cursor-pointer">
                <Card
                  key={index}
                  image={trip.image}
                  title={trip.title}
                  description={trip.description}
                  price={"DZD " + trip.price.toFixed(2)}
                  rating={trip.rating}
                />
              </Link>
            ))}
          </div>

          {/* Load More Button */}
          {hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={handleLoadMore}
                className="flex items-center gap-2 px-6 py-3 border-2 border-cyan-900 text-cyan-900 rounded-md hover:bg-cyan-100 cursor-pointer"
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
