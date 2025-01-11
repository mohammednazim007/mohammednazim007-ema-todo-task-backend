require("dotenv").config("../.env");
const express = require("express");
const middleware = require("./middleware");
const router = require("./router");
const { notFoundHandler, errorHandler } = require("./error");

const app = express();

app.use(middleware);
app.use("/api/v1", router);

// global error handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
