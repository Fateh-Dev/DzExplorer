require("dotenv").config();
const sequelize = require("./config/database");
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const app = express();

// Allow all origins (for development purposes)
app.use(cors()); // Allows all domains to access your API

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
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
    });
  })
  .catch(err => {
    console.error("Failed to sync database:", err);
    process.exit(1);
  });
