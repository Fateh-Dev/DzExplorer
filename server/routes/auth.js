const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { authenticateToken } = require("../middleware/auth");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/verify", authenticateToken, authController.verifyToken);
router.post("/refresh", authController.refreshToken);

module.exports = router;
