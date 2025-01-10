require("dotenv").config("../.env");
const express = require("express");
const middleware = require("./middleware");
const router = require("./router");
const { notFoundHandler, errorHandler } = require("./error");

const app = express();

// Handle OPTIONS request (preflight request)
app.options("*", (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Replace with your client's origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.status(200).end();
});

app.use(middleware);
app.use(router);

// global error handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
