const { Trip, User } = require("../models");

// Add trip to wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    await user.addWishlist(req.params.tripId);
    res.json({ message: "Trip added to wishlist" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add to wishlist" });
  }
};

// Remove trip from wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    await user.removeWishlist(req.params.tripId);
    res.json({ message: "Trip removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from wishlist" });
  }
};

// Get user's wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      include: [{ model: Trip, as: "wishlist" }]
    });
    res.json(user.wishlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to get wishlist" });
  }
};
