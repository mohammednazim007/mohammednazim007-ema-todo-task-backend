const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const corsOptions = {
  origin: ["http://localhost:3000", "https://emaserver.vercel.app/api/v1"],
  // methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  // allowedHeaders: ["Content-Type", "Authorization"],
  // credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Allowed HTTP methods
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Origin-Headers",
  ],
};

const middleware = [cors(corsOptions), morgan("dev"), express.json()];

module.exports = middleware;
