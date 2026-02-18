import * as dotenv from "dotenv";
dotenv.config();
import { StatusCodes } from "http-status-codes";
import cors from "cors";
import morgan from "morgan";
import compression from "compression";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import fileUpload from "express-fileupload";
import { errorHandlerMiddleware } from "./middleware/error-handler.js";
import { handleNotFound } from "./middleware/not-found.js";
import { connectDB } from "./utils/util.js";
import { generalLimiter } from "./middleware/rateLimiter.js";

// import routes

import swaggerSetup from "./utils/swagger.js";
import route from "./router/index.js";

import express, { Application, Request, Response, NextFunction } from "express";
import { BadRequestError } from "./utils/error.js";

const app: Application = express();

app.set("trust proxy", 1);
app.use(morgan("dev"));

  app.use(cors({
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS
      ? process.env.ALLOWED_ORIGINS.split(",")
      : [];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new BadRequestError("CORS policy: Origin not allowed"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true,
}));
//app.use(express.raw({ type: "application/json" }))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
  app.use(compression());
  app.use(generalLimiter); // Rate limiting in production
}


// Custom mongoSanitize middleware to avoid overwriting req.query property
app.use((req, res, next) => {
  if (req.query) {
    Object.assign(req.query, mongoSanitize.sanitize(req.query));
  }
  if (req.body) {
    Object.assign(req.body, mongoSanitize.sanitize(req.body));
  }
  if (req.params) {
    Object.assign(req.params, mongoSanitize.sanitize(req.params));
  }
  next();
});
app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use((req, res, next) => {
    console.log(`${req.method} >> ${req.get("HOST")}${req.originalUrl}`);
    if (["POST", "PUT", "PATCH"].includes(req.method))
      console.log("========Request body==========\n", req.body);
    if (
      ["GET", "DELETE"].includes(req.method) &&
      Object.keys(req.params).length > 0
    )
      console.log("========Request params==========\n", req.params);

    if (req.method === "GET" && Object.keys(req.query).length > 0)
      console.log("========Request query string==========\n", req.query);
    console.log("====Auth token====\n", req.headers);

    next();
  });
}

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to FOOD-APP Service api",
    httpStatusCode: StatusCodes.OK,
    service: process.env.SERVICE_NAME,
  });
});


// Swagger docs
swaggerSetup(app);

// THEN use your main router
app.use(route);

// Error handlers
app.use(handleNotFound);
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT;

let server: ReturnType<typeof app.listen>;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    server = app.listen(port, () => {
      console.log(`⚡️ Server⚡️Listening on port ${port}...`);
      console.log(`📚 Swagger docs available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.log("An error occurred:", error);
  }
};

start();

process.on("SIGTERM", () => {
  if (server) {
    server.close(() => {
      console.log("Process terminated");
    });
  }
});

process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection:", err);
  if (server) {
    server.close(() => process.exit(1));
  } else {
    process.exit(1);
  }
});
