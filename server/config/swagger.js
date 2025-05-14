const swaggerJSDoc = require("swagger-jsdoc");
const path = require("path");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "DZ Explorer API",
      version: "1.0.0",
      description: "API documentation for DZ Explorer platform"
    },
    servers: [
      {
        url: "http://localhost:5000" // Your deployed API URL
      }
    ],
    components: {
      schemas: {
        Trip: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              description: "The ID of the trip"
            },
            title: {
              type: "string",
              description: "The title of the trip"
            },
            description: {
              type: "string",
              description: "Detailed description of the trip"
            },
            rating: {
              type: "number",
              description: "Rating of the trip",
              format: "float"
            },
            price: {
              type: "number",
              description: "Price of the trip",
              format: "float"
            },
            date: {
              type: "string",
              format: "date",
              description: "Date of the trip"
            },
            views: {
              type: "integer",
              description: "Number of views of the trip"
            },
            image: {
              type: "string",
              description: "URL or base64 encoded image of the trip"
            },
            thumbnail: {
              type: "string",
              description: "Thumbnail image of the trip"
            }
          }
        }
      }
    }
  },
  apis: [path.join(__dirname, "../routes/*.js"), path.join(__dirname, "../controllers/*.js")] // Correct file paths
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
