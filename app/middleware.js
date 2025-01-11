const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

const middleware = [cors(corsOptions), morgan("dev"), express.json()];

module.exports = middleware;
