// require("dotenv").config("../.env");
// const express = require("express");
// const middleware = require("./middleware");
// const router = require("./router");
// const { notFoundHandler, errorHandler } = require("./error");

// const app = express();

// app.use(middleware);
// app.use(router);

// // global error handler
// app.use(notFoundHandler);
// app.use(errorHandler);

// module.exports = app;
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Allow requests only from your frontend
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

const middleware = [
  morgan("dev"),
  cors(corsOptions), // Apply CORS with options
  express.json(), // Parse incoming JSON requests
];

module.exports = middleware;
