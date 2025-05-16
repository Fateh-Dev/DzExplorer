const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const authMiddleware = require("../middleware/jwtMiddleware");

// Add comment (requires auth)
router.post("/:tripId", authMiddleware, commentController.addComment);

// Get comments for a trip
router.get("/:tripId", commentController.getCommentsForTrip);

// Delete comment (requires auth)
router.delete("/:id", authMiddleware, commentController.deleteComment);

module.exports = router;
