const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
authMiddleware = require("../middleware/jwtMiddleware"); // Assuming you have a JWT middleware for authentication

router.get("/", authMiddleware, userController.getAllUsers);
router.get("/:id", authMiddleware, userController.getUserById);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
