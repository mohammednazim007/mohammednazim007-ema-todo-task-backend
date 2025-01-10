// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const middleware = [morgan("dev"), cors(), express.json()];

// module.exports = middleware;const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// CORS configuration
const corsOptions = {
  origin: "http://localhost:3000", // Your frontend URL during development
  methods: "GET,POST,PUT,DELETE", // Allowed HTTP methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
};

const middleware = [
  morgan("dev"),
  cors(corsOptions), // Apply CORS with options
  express.json(), // Parse incoming JSON requests
];

module.exports = middleware;
