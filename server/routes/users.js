const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { authenticateToken, authorizeRole } = require("../middleware/auth");

// Admin-only routes for user management
router.get("/", authenticateToken, authorizeRole(["Admin"]), userController.getAllUsers);
router.get("/:id", authenticateToken, authorizeRole(["Admin"]), userController.getUserById);
router.delete("/:id", authenticateToken, authorizeRole(["Admin"]), userController.deleteUser);

module.exports = router;
