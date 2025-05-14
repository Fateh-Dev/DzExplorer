const jwt = require("jsonwebtoken");
const { secret } = require("../config/jwtConfig");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Attach user info (id, role) to request
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};
