import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import express from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "School Management API",
      version: "1.0.0",
      description: "API documentation for the School Management System",
    },
    servers: [
      {
        url: process.env.BASE_URL || 'http://localhost:8000',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: [
    "./src/app/modules/*/*.ts",
    "./src/app/modules/*/index.ts",
    "./src/app/modules/*/controller.ts",
    "./dist/app/modules/*/*.js",
    "./dist/app/modules/*/index.js",
    "./dist/app/modules/*/controller.js",
  ],
};

const swaggerSpec = swaggerJsdoc(options);

export default (app: express.Application) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
