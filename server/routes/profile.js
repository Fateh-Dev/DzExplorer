const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

const { authenticateToken } = require("../middleware/auth");

// Get the profile of the currently authenticated user
router.get("/", authenticateToken, profileController.getAuthenticatedProfile);
router.get("/:id", profileController.getProfile);

// Create or update the user's profile
router.post("/", authenticateToken, profileController.upsertProfile);

module.exports = router;
