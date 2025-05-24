const { Trip, Image, Comment, User, Profile } = require("../models");
const { Op } = require("sequelize");

// Create new trip
exports.createTrip = async (req, res) => {
  try {
    const { title, description, rating, image, thumbnail, price, date } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!title || !description || !price || !date) {
      return res.status(400).json({ error: "Title, description, price, and date are required" });
    }

    // Validate data types
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    if (price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    // Create trip
    const trip = await Trip.create({
      title: title.trim(),
      description: description.trim(),
      rating: rating || null,
      image: image?.trim() || null,
      thumbnail: thumbnail?.trim() || null,
      price: parseFloat(price),
      date: new Date(date),
      userId
    });

    res.status(201).json(trip);
  } catch (error) {
    console.error("Create trip error:", error);

    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map(err => err.message);
      return res.status(400).json({ error: "Validation failed", details: validationErrors });
    }

    res.status(500).json({ error: "Failed to create trip" });
  }
};

// Get all trips
exports.getAllTrips = async (req, res) => {
  try {
    const trips = await Trip.findAll({
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["id", "url", "caption"]
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "description", "rating", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["id", "username"]
            }
          ]
        },
        {
          model: User,
          attributes: ["id", "username", "email"],
          include: [
            {
              model: Profile,
              as: "profile",
              attributes: ["name", "contactNumber1", "areaOfWork", "image"]
            }
          ]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(trips);
  } catch (error) {
    console.error("Get all trips error:", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};

// Get trip by ID
exports.getTripById = async (req, res) => {
  try {
    const { id } = req.params;

    // Update your getTripById controller to include all relationships
    const trip = await Trip.findByPk(id, {
      include: [
        {
          model: Image,
          as: "images",
          attributes: ["id", "url", "caption", "isMain"]
        },
        {
          model: Comment,
          as: "comments",
          attributes: ["id", "description", "rating", "createdAt"],
          include: [
            {
              model: User,
              attributes: ["id", "username"]
            }
          ]
        },
        {
          model: User,
          attributes: ["id", "username", "email"],
          include: [
            {
              model: Profile,
              as: "profile",
              attributes: ["name", "contactNumber1", "contactNumber2", "areaOfWork", "image"]
            }
          ]
        },
        // Add these new includes:
        {
          model: TripInclusion,
          as: "inclusions",
          attributes: ["id", "text"]
        },
        {
          model: TripExclusion,
          as: "exclusions",
          attributes: ["id", "text"]
        },
        {
          model: TripReview,
          as: "reviews",
          attributes: ["id", "name", "country", "date", "comment", "rating"]
        },
        {
          model: TripDay,
          as: "days",
          attributes: ["id", "dayTitle", "activities", "dayOrder"],
          order: [["dayOrder", "ASC"]]
        },
        {
          model: Accommodation,
          as: "accommodations",
          attributes: ["id", "name", "stars", "nights", "hasPool", "includesBreakfast", "description"]
        },
        {
          model: PickupPoint,
          as: "pickupPoints",
          attributes: ["id", "location", "time"]
        }
      ]
    });

    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    res.json({ data: trip }); // Match frontend expectation
  } catch (error) {
    console.error("Get trip by ID error:", error);
    res.status(500).json({ error: "Failed to fetch trip" });
  }
};

// Update trip
exports.updateTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, rating, image, thumbnail, price, date } = req.body;
    const userId = req.user.id;

    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Authorization check
    if (trip.userId !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to update this trip" });
    }

    // Validate if provided
    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    if (price && price <= 0) {
      return res.status(400).json({ error: "Price must be greater than 0" });
    }

    // Update trip
    const updateData = {};
    if (title) updateData.title = title.trim();
    if (description) updateData.description = description.trim();
    if (rating !== undefined) updateData.rating = rating;
    if (image !== undefined) updateData.image = image?.trim() || null;
    if (thumbnail !== undefined) updateData.thumbnail = thumbnail?.trim() || null;
    if (price) updateData.price = parseFloat(price);
    if (date) updateData.date = new Date(date);

    await trip.update(updateData);
    res.json(trip);
  } catch (error) {
    console.error("Update trip error:", error);
    res.status(500).json({ error: "Failed to update trip" });
  }
};

// Delete trip
exports.deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Authorization check
    if (trip.userId !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this trip" });
    }

    await trip.destroy();
    res.json({ message: "Trip deleted successfully" });
  } catch (error) {
    console.error("Delete trip error:", error);
    res.status(500).json({ error: "Failed to delete trip" });
  }
};

// Increment view count
exports.incrementViewCount = async (req, res) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    await trip.increment("views");
    res.json({ message: "View count incremented" });
  } catch (error) {
    console.error("Increment view error:", error);
    res.status(500).json({ error: "Failed to increment view count" });
  }
};

// Get trips with pagination and filters
exports.getTripsWithPagination = async (req, res) => {
  try {
    const { page = 1, limit = 8, startDate, endDate, search } = req.query;
    const pageNumber = Math.max(1, parseInt(page) || 1);
    const pageLimit = Math.min(50, Math.max(1, parseInt(limit) || 8)); // Limit max to 50
    const offset = (pageNumber - 1) * pageLimit;

    const where = {};

    // Search filter
    if (search && search.trim()) {
      where[Op.or] = [{ title: { [Op.iLike]: `%${search.trim()}%` } }, { description: { [Op.iLike]: `%${search.trim()}%` } }];
    }

    // Date filter
    if (startDate || endDate) {
      where.date = {};
      if (startDate) where.date[Op.gte] = new Date(startDate);
      if (endDate) where.date[Op.lte] = new Date(endDate);
    }

    const { count, rows: trips } = await Trip.findAndCountAll({
      where,
      attributes: ["id", "title", "price", "description", "image", "rating", "views", "date", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"],
          include: [
            {
              model: Profile,
              as: "profile",
              attributes: ["name", "contactNumber1", "contactNumber2", "areaOfWork", "image"]
            }
          ]
        }
      ],
      offset,
      limit: pageLimit,
      order: [["date", "ASC"]]
    });

    const totalPages = Math.ceil(count / pageLimit);

    res.json({
      data: trips,
      pagination: {
        currentPage: pageNumber,
        totalPages,
        totalItems: count,
        itemsPerPage: pageLimit,
        hasNextPage: pageNumber < totalPages,
        hasPrevPage: pageNumber > 1
      }
    });
  } catch (error) {
    console.error("Get trips with pagination error:", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
};
