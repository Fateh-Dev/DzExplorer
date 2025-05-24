const { Comment, User, Trip } = require("../models");

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { tripId } = req.params;
    const { description, rating } = req.body;
    const userId = req.user.id;

    // Input validation
    if (!description || description.trim() === "") {
      return res.status(400).json({ error: "Comment description is required" });
    }

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Rating must be between 1 and 5" });
    }

    // Check if trip exists
    const trip = await Trip.findByPk(tripId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    // Create comment
    const comment = await Comment.create({
      description: description.trim(),
      rating,
      userId,
      tripId
    });

    // Return comment with user info
    const fullComment = await Comment.findByPk(comment.id, {
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"]
        }
      ]
    });

    res.status(201).json(fullComment);
  } catch (err) {
    console.error("Add comment error:", err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// Get comments for trip
exports.getCommentsForTrip = async (req, res) => {
  try {
    const { tripId } = req.params;

    const comments = await Comment.findAll({
      where: { tripId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"]
        }
      ],
      order: [["createdAt", "ASC"]]
    });

    res.json(comments);
  } catch (err) {
    console.error("Get comments error:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const comment = await Comment.findByPk(id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Authorization check
    if (comment.userId !== userId && req.user.role !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this comment" });
    }

    await comment.destroy();
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Delete comment error:", err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
