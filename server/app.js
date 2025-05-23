require("dotenv").config();
const sequelize = require("./config/database");
const express = require("express");
const cors = require("cors");

// Environment-based CORS configuration
const getAllowedOrigins = () => {
  const origins = process.env.ALLOWED_ORIGINS;
  if (origins) {
    return origins.split(",").map(origin => origin.trim());
  }

  // Default origins for development
  if (process.env.NODE_ENV === "development") {
    return ["http://localhost:3000", "http://127.0.0.1:3000"];
  }

  return []; // Production should always specify ALLOWED_ORIGINS
};

const app = express();
const port = process.env.PORT || 5000;
const allowedOrigins = getAllowedOrigins();

const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json({ limit: "10mb" })); // Increased limit for base64 images
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// API routes
app.use("/api", require("./routes/api"));

// Recommended 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    error: "Route not found",
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("Global error handler:", err);

  // CORS errors
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      error: "CORS Error",
      message: "Origin not allowed"
    });
  }

  // JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({
      error: "Invalid JSON",
      message: "Request body contains invalid JSON"
    });
  }

  // Default error response
  const statusCode = err.statusCode || err.status || 500;
  res.status(statusCode).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "development" ? err.message : "Something went wrong",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
});

// Graceful shutdown handler
const gracefulShutdown = signal => {
  console.log(`Received ${signal}. Starting graceful shutdown...`);

  process.exit(0);
};

process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

// Start server after database sync
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync database models
    await sequelize.sync({ alter: process.env.NODE_ENV === "development" });
    console.log("Database models synchronized.");

    // Start server
    const server = app.listen(port, "0.0.0.0", () => {
      console.log(`🚀 Server running on port ${port}`);
      console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`🌐 CORS origins: ${allowedOrigins.join(", ") || "None configured"}`);
    });

    // Handle server errors
    server.on("error", err => {
      if (err.code === "EADDRINUSE") {
        console.error(`Port ${port} is already in use`);
      } else {
        console.error("Server error:", err);
      }
      process.exit(1);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
