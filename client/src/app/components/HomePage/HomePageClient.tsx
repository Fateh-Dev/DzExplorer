"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import LoadMoreButton from "./LoadMoreButton";
import GoToTopButton from "./GoToTopButton";
import TripGrid from "./TripGrid";
import { Loading, NoTrips } from "./Loading";
import SearchBar from "./SearchBar";
import { PAGE_SIZE } from "../../constants";
import { useAuth } from "../../context/authContext";
import api from "../../lib/axios";

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

interface Props {
  initialTrips: Trip[];
}

const HomePageClient: React.FC<Props> = ({ initialTrips }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showGoToTop, setShowGoToTop] = useState(false);
  const [data, setData] = useState<Trip[]>(initialTrips);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialTrips.length === PAGE_SIZE);
  const [searchQueryInput, setSearchQueryInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);

  // Wishlist fetching & toggle
  const fetchWishlist = useCallback(
    async () => {
      if (!isLoggedIn) {
        setWishlistIds([]);
        return;
      }
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setWishlistIds([]);
          return;
        }
        const res = await api.get("/wishlist", {
          headers: { Authorization: `Bearer ${token}` }
        });
        const wishlist: { id: number }[] = res.data;
        setWishlistIds(wishlist.map(item => item.id));
      } catch (err) {
        console.error("Failed to fetch wishlist", err);
        setWishlistIds([]);
      }
    },
    [isLoggedIn]
  );

  useEffect(
    () => {
      fetchWishlist();
    },
    [fetchWishlist]
  );

  const handleWishlistToggle = useCallback((id: number, inWishlist: boolean) => {
    setWishlistIds(prev => (inWishlist ? [...prev, id] : prev.filter(wid => wid !== id)));
  }, []);

  // Fetch trips on search/filter changes
  const fetchData = useCallback(
    async (pageNumber = 1) => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: pageNumber.toString(),
          limit: PAGE_SIZE.toString()
        });
        if (searchQuery) params.append("search", searchQuery);
        if (startDate) params.append("startDate", startDate);
        if (endDate) params.append("endDate", endDate);

        const res = await api.get("/trips/with-pagination", { params });
        const result = res.data;

        if (result.data.length < PAGE_SIZE) {
          setHasMore(false);
        } else {
          setHasMore(true);
        }

        if (pageNumber === 1) {
          setData(result.data);
        } else {
          setData(prev => [...prev, ...result.data]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, startDate, endDate]
  );

  useEffect(
    () => {
      setPage(1);
      setHasMore(true);
      fetchData(1);
    },
    [fetchData]
  );

  const handleLoadMore = () => {
    if (isLoading || !hasMore) return;
    const nextPage = page + 1;
    setPage(nextPage);
    fetchData(nextPage);
  };

  // Scroll to top button
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const onScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setShowGoToTop(window.scrollY > 300);
      }, 100);
    };
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const wishlistMap = useMemo(
    () => {
      const map = new Map<number, boolean>();
      wishlistIds.forEach(id => map.set(id, true));
      return map;
    },
    [wishlistIds]
  );

  return (
    <div className="mx-auto w-full max-w-7xl py-4 relative">
      <div className="mb-6 flex flex-wrap sm:flex-nowrap space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
        <SearchBar
          searchQueryInput={searchQueryInput}
          setSearchQueryInput={setSearchQueryInput}
          setSearchQuery={setSearchQuery}
          startDate={startDate}
          setStartDate={setStartDate}
          endDate={endDate}
          setEndDate={setEndDate}
        />
      </div>

      {isLoading && data.length === 0 ? (
        <Loading />
      ) : data.length === 0 ? (
        <NoTrips />
      ) : (
        <>
          <TripGrid data={data} wishlistMap={wishlistMap} handleWishlistToggle={handleWishlistToggle} />
          {hasMore && <LoadMoreButton isLoading={isLoading} onLoadMore={handleLoadMore} />}
        </>
      )}

      {showGoToTop && <GoToTopButton onClick={handleGoToTop} />}
    </div>
  );
};

export default HomePageClient;
