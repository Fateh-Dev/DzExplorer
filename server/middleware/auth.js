// middleware/auth.js
const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET; // Replace with your actual secret or use process.env.SECRET

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // attach user info (like id, role) to request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
// Role-based authorization middleware
// Role-based authorization: accepts one or more allowed roles
const authorizeRole = roles => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Access denied: insufficient permissions" });
  }
  next();
};

module.exports = {
  authenticateToken,
  authorizeRole
};
