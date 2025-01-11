const cors = require("cors");
const morgan = require("morgan");
const express = require("express");

// Define the CORS options
const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Include required headers
  credentials: true,
};

// Middleware array
const middleware = [cors(corsOptions), morgan("dev"), express.json()];

module.exports = middleware;
