const { Trip, Image, Comment, User } = require("../models");

// 🆕 Create a new trip (for an agency)

exports.createTrip = async (req, res) => {
  try {
    const { title, description, rating, image, thumbnail, price, date } = req.body;
    const userId = req.user.id; // assuming req.user is set via auth middleware

    // Ensure all required fields are provided
    if (!title || !description || !rating || !image || !thumbnail || !price || !date) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create the trip
    const trip = await Trip.create({
      title,
      description,
      rating,
      image,
      thumbnail,
      price,
      date,
      userId
    });

    res.status(201).json(trip);
  } catch (error) {
    // Improved error logging
    console.error("Create Trip Error:", error);

    // If it's a Sequelize ValidationError, log the details
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map(err => err.message);
      console.error("Validation Errors:", validationErrors);
      return res.status(400).json({ error: "Validation failed", details: validationErrors });
    }

    // General error logging to capture any other types of errors
    console.error("General Error:", error.message || error);
    res.status(500).json({ error: "Failed to create trip", details: error.message });
  }
};

// 📖 Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      include: [
        { model: Image, as: "images" },
        { model: Comment, as: "comments" },
        { model: User, attributes: ["username", "email"] }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(trips);
  } catch (error) {
    console.error("Get Trips Error:", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

// 🔍 Get a single trip by ID
exports.getTripById = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id, {
      include: [
        { model: Image, as: "images", attributes: ["id", "url", "isMain"] },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "description", "rating", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["username"]
              // include: [
              //   {
              //     model: require("../models").Profile,
              //     as: "profile",
              //     attributes: ["name", "image"]
              //   }
              // ]
            }
          ]
        },
        {
          model: User,
          attributes: ["id", "username", "email"],
          include: [
            {
              model: require("../models").Profile,
              as: "profile",
              attributes: ["name", "contactNumber1", "contactNumber2", "areaOfWork", "image"]
            }
          ]
        }
      ]
    });

    if (!trip) return res.status(404).json({ error: "Trip not found" });

    res.json(trip);
  } catch (error) {
    console.error("Get Trip Error:", error);
    res.status(500).json({ error: "Failed to fetch trip" });
  }
};

// ✏️ Update a trip
exports.updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);

    if (!trip) return res.status(404).json({ error: "Trip not found" });

    // Optional: Check if user owns the trip
    // if (trip.userId !== req.user.id) return res.status(403).json({ error: 'Unauthorized' });

    const { title, description, rating, image, thumbnail, price, date } = req.body;

    await trip.update({ title, description, rating, image, thumbnail, price, date });

    res.json(trip);
  } catch (error) {
    console.error("Update Trip Error:", error);
    res.status(500).json({ error: "Failed to update trip" });
  }
};

// ❌ Delete a trip
exports.deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByPk(req.params.id);

    if (!trip) return res.status(404).json({ error: "Trip not found" });

    await trip.destroy();
    res.json({ message: "Trip deleted" });
  } catch (error) {
    console.error("Delete Trip Error:", error);
    res.status(500).json({ error: "Failed to delete trip" });
  }
};

// get trips with pagination
const { Op } = require("sequelize");

exports.getTripsWithPagination = async (req, res) => {
  const { page = 1, limit = 8, startDate, endDate, search } = req.query;
  const offset = (page - 1) * limit;

  const where = {};

  // Search filter
  if (search) {
    where[Op.or] = [{ title: { [Op.iLike]: `%${search}%` } }, { description: { [Op.iLike]: `%${search}%` } }];
  }

  // Date filter
  if (startDate || endDate) {
    where.date = {};
    if (startDate) where.date[Op.gte] = startDate;
    if (endDate) where.date[Op.lte] = endDate;
  }

  const trips = await Trip.findAll({
    where,
    attributes: ["id", "title", "price", "description", "image", "rating"], // Only return these fields
    offset: parseInt(offset),
    limit: parseInt(limit),
    order: [["date", "ASC"]]
  });

  res.json({ data: trips });
};
