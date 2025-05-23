// config/jwtConfig.js - Secure JWT configuration
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is required");
}

if (process.env.JWT_SECRET.length < 32) {
  throw new Error("JWT_SECRET must be at least 32 characters long");
}

module.exports = {
  secret: process.env.JWT_SECRET || "your_super_secret_jwt_key_at_least_32_characters_long",
  expiresIn: process.env.JWT_EXPIRES_IN || "24h", // Configurable expiration
  refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  issuer: process.env.JWT_ISSUER || "dz-explorer-api",
  audience: process.env.JWT_AUDIENCE || "dz-explorer-client"
};
