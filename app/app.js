require("dotenv").config("../.env");
const express = require("express");
const middleware = require("./middleware");
const router = require("./router");
const { notFoundHandler, errorHandler } = require("./error");

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(require("cors")(corsOptions));
app.use(middleware);
app.use(router);

// global error handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
