// middleware/auth.js - Consolidated authentication middleware
const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

if (!secret) {
  throw new Error("JWT_SECRET environment variable is required");
}

/**
 * Middleware to authenticate JWT tokens
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next function
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({
      error: "Access denied",
      message: "No token provided"
    });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // attach user info (like id, role) to request
    next();
  } catch (err) {
    let message = "Invalid token";
    if (err.name === "TokenExpiredError") {
      message = "Token has expired";
    } else if (err.name === "JsonWebTokenError") {
      message = "Invalid token format";
    }

    return res.status(403).json({
      error: "Authentication failed",
      message
    });
  }
};

/**
 * Role-based authorization middleware
 * @param {Array|String} allowedRoles - Single role or array of allowed roles
 * @returns {Function} Express middleware function
 */
const authorizeRole = allowedRoles => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      error: "Authentication required",
      message: "User not authenticated"
    });
  }

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(req.user.role)) {
    return res.status(403).json({
      error: "Access denied",
      message: "Insufficient permissions"
    });
  }

  next();
};

/**
 * Optional authentication - doesn't fail if no token provided
 * Used for routes that work differently for authenticated vs anonymous users
 */
const optionalAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return next(); // Continue without user info
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
  } catch (err) {
    // Don't fail, just continue without user info
    console.warn("Optional auth failed:", err.message);
  }

  next();
};

module.exports = {
  authenticateToken,
  authorizeRole,
  optionalAuth
};
