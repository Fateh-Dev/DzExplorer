const { Image, Trip } = require("../models");

// Add image to trip
exports.addImage = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { url, caption } = req.body;
    const userId = req.user.id;

    // Validate input
    if (!url || url.trim() === "") {
      return res.status(400).json({ error: "Image URL is required" });
    }

    // Verify trip exists
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Create image
    const image = await Image.create({
      url: url.trim(),
      caption: caption?.trim() || null,
      tripId,
      userId
    });

    res.status(201).json(image);
  } catch (err) {
    console.error("Add image error:", err);
    res.status(500).json({ error: "Failed to add image" });
  }
};

// Get images by trip
exports.getImagesByTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const images = await Image.findAll({
      where: { tripId },
      order: [["createdAt", "DESC"]]
    });

    res.json(images);
  } catch (err) {
    console.error("Get images error:", err);
    res.status(500).json({ error: "Failed to get images" });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const image = await Image.findByPk(id);
    if (!image) {
      return res.status(404).json({ error: "Image not found" });
    }

    // Authorization check - only image owner or admin can delete
    if (image.userId !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this image" });
    }

    await image.destroy();
    res.json({ message: "Image deleted successfully" });
  } catch (err) {
    console.error("Delete image error:", err);
    res.status(500).json({ error: "Failed to delete image" });
  }
};
