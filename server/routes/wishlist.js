const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");

const { authenticateToken } = require("../middleware/auth");

// GET /api/wishlist → Get logged-in user's wishlist
router.get("/", authenticateToken, wishlistController.getWishlist);

// POST /api/wishlist/:tripId → Add trip to wishlist
router.post("/:tripId", authenticateToken, wishlistController.addToWishlist);

// DELETE /api/wishlist/:tripId → Remove trip from wishlist
router.delete("/:tripId", authenticateToken, wishlistController.removeFromWishlist);

module.exports = router;
