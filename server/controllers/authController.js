const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expiresIn, issuer, audience } = require("../config/jwtConfig");
const { handleControllerError, sendSuccessResponse, asyncHandler } = require("../config/utils/errorHandler");

/**
 * Generate JWT token for user
 * @param {Object} user - User object
 * @returns {string} JWT token
 */
const generateToken = user => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    secret,
    {
      expiresIn,
      issuer,
      audience
    }
  );
};

/**
 * Validate registration input
 * @param {Object} body - Request body
 * @returns {Array} Array of validation errors
 */
const validateRegistration = body => {
  const errors = [];
  const { username, email, password, role } = body;

  if (!username || username.trim().length < 3) {
    errors.push("Username must be at least 3 characters long");
  }

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errors.push("Valid email is required");
  }

  if (!password || password.length < 6) {
    errors.push("Password must be at least 6 characters long");
  }

  if (!role || !["Agency", "SimpleUser", "Admin"].includes(role)) {
    errors.push("Role must be one of: Agency, SimpleUser, Admin");
  }

  return errors;
};

/**
 * Register a new user
 */
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate input
  const validationErrors = validateRegistration(req.body);
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      error: "Validation failed",
      details: validationErrors
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({
    where: {
      $or: [{ email: email.toLowerCase() }, { username: username.toLowerCase() }]
    }
  });

  if (existingUser) {
    const field = existingUser.email === email.toLowerCase() ? "Email" : "Username";
    return res.status(409).json({
      success: false,
      error: `${field} already registered`,
      field: field.toLowerCase()
    });
  }

  // Hash password
  const saltRounds = process.env.BCRYPT_ROUNDS || 12;
  const hashedPassword = await bcrypt.hash(password, parseInt(saltRounds));

  // Create user
  const user = await User.create({
    username: username.trim(),
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    role
  });

  // Generate JWT
  const token = generateToken(user);

  sendSuccessResponse(
    res,
    {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      },
      token
    },
    "User registered successfully",
    201
  );
});

/**
 * Login user
 */
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      error: "Email and password are required"
    });
  }

  // Find user
  const user = await User.findOne({
    where: { email: email.toLowerCase().trim() }
  });

  if (!user) {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials"
    });
  }

  // Verify password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials"
    });
  }

  // Generate JWT
  const token = generateToken(user);

  sendSuccessResponse(
    res,
    {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
        lastLogin: new Date()
      },
      token
    },
    "Login successful"
  );
});

/**
 * Verify token endpoint
 */
exports.verifyToken = asyncHandler(async (req, res) => {
  // User info is attached by auth middleware
  const user = await User.findByPk(req.user.id, {
    attributes: ["id", "username", "email", "role", "createdAt"]
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found"
    });
  }

  sendSuccessResponse(res, { user }, "Token is valid");
});

/**
 * Refresh token endpoint
 */
exports.refreshToken = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      error: "User not found"
    });
  }

  const newToken = generateToken(user);

  sendSuccessResponse(res, { token: newToken }, "Token refreshed successfully");
});
