const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const middleware = [
  morgan("dev"),
  cors({
    origin: "http://localhost:3000", // Replace with your client's URL (for development)
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  }),
  express.json(),
];

module.exports = middleware;
