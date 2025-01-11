require("dotenv").config("../.env");
const express = require("express");
const middleware = require("./middleware");
const router = require("./router");
const { notFoundHandler, errorHandler } = require("./error");

const app = express();

// Define the CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Include required headers
  credentials: true,
};

app.options("*", cors(corsOptions));
app.use(middleware);
app.use(router);

// global error handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
