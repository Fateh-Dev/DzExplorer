const { Comment, User, Trip } = require("../models");

// Add comment to trip
exports.addComment = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;
    const comment = await Comment.create({ ...req.body, userId, tripId });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// Get comments for a trip
exports.getCommentsForTrip = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { tripId: req.params.tripId },
      include: [User]
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// Delete comment
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    await comment.destroy();
    res.json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
