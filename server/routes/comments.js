const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

const { authenticateToken } = require("../middleware/auth");

// Add comment (requires auth)
router.post("/:tripId", authenticateToken, commentController.addComment);

// Get comments for a trip
router.get("/:tripId", commentController.getCommentsForTrip);

// Delete comment (requires auth)
router.delete("/:id", authenticateToken, commentController.deleteComment);

module.exports = router;
