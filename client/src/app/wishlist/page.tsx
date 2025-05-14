import React from "react";

const WishlistPage = () => (
  <div className="max-w-2xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-4">My Wishlist</h1>
    <p className="mb-6">Here you can view and manage your favorite trips. Add trips to your wishlist from the trip details page and plan your next adventure!</p>
    {/* Wishlist trips will be listed here in the future */}
    <div className="text-gray-500">No trips in your wishlist yet.</div>
  </div>
);

export default WishlistPage;