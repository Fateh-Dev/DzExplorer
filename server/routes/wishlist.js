const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const authMiddleware = require("../middleware/jwtMiddleware"); // Auth middleware

// GET /api/wishlist → Get logged-in user's wishlist
router.get("/", authMiddleware, wishlistController.getWishlist);

// POST /api/wishlist/:tripId → Add trip to wishlist
router.post("/:tripId", authMiddleware, wishlistController.addToWishlist);

// DELETE /api/wishlist/:tripId → Remove trip from wishlist
router.delete("/:tripId", authMiddleware, wishlistController.removeFromWishlist);

module.exports = router;
