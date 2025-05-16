const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwtConfig");

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role
    });
    // console.log("User data:", user);
    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn
    });

    res.status(201).json({ user: { id: user.id, username, email, role }, token });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, secret, {
      expiresIn
    });

    res.json({ user: { id: user.id, username: user.username, email, role: user.role }, token });
  } catch (err) {
    res.status(500).json({ error: "Failed to login" });
  }
};
