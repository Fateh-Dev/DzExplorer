const { Comment, User, Trip } = require("../models");

// Add comment
exports.addComment = async (req, res) => {
  try {
    const { tripId } = req.params;
    const userId = req.user.id;

    // Create the comment
    const comment = await Comment.create({
      ...req.body,
      userId,
      tripId
    });

    // Fetch the full comment with author info (using 'author' alias and correct fields)
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

// Get comments for a trip
exports.getCommentsForTrip = async (req, res) => {
  try {
    const comments = await Comment.findAll({
      where: { tripId: req.params.tripId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "email"]
        }
      ]
    });

    res.json(comments);
  } catch (err) {
    console.error("Get comments error:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
// Delete comment by id
exports.deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Optional: check if current user owns the comment or is admin
    // if (comment.userId !== req.user.id && req.user.role !== "Admin") {
    //   return res.status(403).json({ error: "Not authorized to delete this comment" });
    // }

    await comment.destroy();

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Delete comment error:", err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
