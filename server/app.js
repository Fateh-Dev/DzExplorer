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

const apiRoutes = require("./routes/api");

// Middleware
app.use(express.json());

// Routes
app.use("/api", apiRoutes);

sequelize.sync({ alter: true }).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  });
});
