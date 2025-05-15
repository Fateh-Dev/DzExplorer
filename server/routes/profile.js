const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");
const authMiddleware = require("../middleware/jwtMiddleware");

// Get the profile of the currently authenticated user
router.get("/", authMiddleware, profileController.getAuthenticatedProfile);
router.get("/:id", profileController.getProfile);

// Create or update the user's profile
router.post("/", authMiddleware, profileController.upsertProfile);

module.exports = router;
