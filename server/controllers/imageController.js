const { Image, Trip } = require("../models");

// Add image to trip
exports.addImage = async (req, res) => {
  try {
    const image = await Image.create(req.body);
    res.status(201).json(image);
  } catch (err) {
    res.status(500).json({ error: "Failed to add image" });
  }
};

// Get images by trip
exports.getImagesByTrip = async (req, res) => {
  try {
    const images = await Image.findAll({ where: { tripId: req.params.tripId } });
    res.json(images);
  } catch (err) {
    res.status(500).json({ error: "Failed to get images" });
  }
};

// Delete image
exports.deleteImage = async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image) return res.status(404).json({ error: "Image not found" });
    await image.destroy();
    res.json({ message: "Image deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete image" });
  }
};
