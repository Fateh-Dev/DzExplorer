require("dotenv").config();
const sequelize = require("./config/database");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const allowedOrigins = ["http://192.168.100.19:3000", "http://localhost:3000"];
const app = express();

const corsOptions = {
  origin: function(origin, callback) {
    console.log("Origin:", origin);
    // allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // origin allowed
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));
// Alternatively, restrict to specific origins
// app.use(cors({
//   origin: 'http://your-frontend-domain.com',
// }));

const port = process.env.PORT || 5000;

// Swagger route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Middleware
app.use(express.json());

// Mount API routes (using api.js)
app.use("/api", require("./routes/api"));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// Start server after database sync
sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, "0.0.0.0", () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  })
  .catch(err => {
    console.error("Failed to sync database:", err);
    process.exit(1);
  });
