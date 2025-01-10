require("dotenv").config("../.env");
const express = require("express");
const middleware = require("./middleware");
const router = require("./router");
const { notFoundHandler, errorHandler } = require("./error");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(middleware);
app.use(router);

// global error handler
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
