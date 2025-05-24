const { User, Profile, Trip, Comment } = require("../models");

// Get all users (Admin only)
exports.getAllUsers = async (req, res) => {
  try {
    // Admin authorization check
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Admin access required" });
    }

    const users = await User.findAll({
      attributes: ["id", "username", "email", "role", "createdAt", "updatedAt"],
      include: [
        {
          model: Profile,
          attributes: ["name", "bio", "location", "image"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    res.json(users);
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const requesterId = req.user.id;
    const requesterRole = req.user.role;

    // Authorization: users can view their own profile, admins can view any
    if (id != requesterId && requesterRole !== "admin") {
      return res.status(403).json({ error: "Not authorized to view this user" });
    }

    const user = await User.findByPk(id, {
      attributes: ["id", "username", "email", "role", "createdAt"],
      include: [
        {
          model: Profile,
          attributes: ["name", "bio", "location", "dateOfBirth", "interests", "image"]
        },
        {
          model: Trip,
          attributes: ["id", "title", "description", "price", "date", "rating", "views"],
          limit: 10, // Limit trips for performance
          order: [["createdAt", "DESC"]]
        },
        {
          model: Comment,
          attributes: ["id", "description", "rating", "createdAt"],
          limit: 10, // Limit comments for performance
          order: [["createdAt", "DESC"]],
          include: [
            {
              model: Trip,
              attributes: ["id", "title"]
            }
          ]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get user by ID error:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};

// Update user (Admin or self)
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email, role } = req.body;
    const requesterId = req.user.id;
    const requesterRole = req.user.role;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Authorization: users can update themselves, admins can update anyone
    if (id != requesterId && requesterRole !== "admin") {
      return res.status(403).json({ error: "Not authorized to update this user" });
    }

    // Only admins can change roles
    if (role && requesterRole !== "admin") {
      return res.status(403).json({ error: "Only admins can change user roles" });
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Update user
    const updateData = {};
    if (username) updateData.username = username.trim();
    if (email) updateData.email = email.trim().toLowerCase();
    if (role && requesterRole === "admin") updateData.role = role;

    await user.update(updateData);

    // Return updated user without sensitive data
    const updatedUser = await User.findByPk(id, {
      attributes: ["id", "username", "email", "role", "updatedAt"]
    });

    res.json(updatedUser);
  } catch (error) {
    console.error("Update user error:", error);

    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    res.status(500).json({ error: "Failed to update user" });
  }
};

// Delete user (Admin only, or self-deletion)
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const requesterId = req.user.id;
    const requesterRole = req.user.role;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Authorization: admins can delete anyone, users can delete themselves
    if (id != requesterId && requesterRole !== "admin") {
      return res.status(403).json({ error: "Not authorized to delete this user" });
    }

    // Prevent admin from deleting themselves (optional business rule)
    if (id == requesterId && requesterRole === "admin") {
      return res.status(400).json({ error: "Admins cannot delete their own account" });
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};

// Get current user info
exports.getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: ["id", "username", "email", "role", "createdAt"],
      include: [
        {
          model: Profile,
          attributes: ["name", "bio", "location", "image"]
        }
      ]
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Get current user error:", error);
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};
