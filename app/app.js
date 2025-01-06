require("dotenv").config("../.env");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const app = express();

app.use([morgan("dev"), cors(), express.json()]);

// global error handler
app.use((_request, _response, next) => {
  const err = new Error("Resource Not Found");
  err.status = 404;
  next(err);
});

app.use((err, _request, response, _next) => {
  response.status(err.status || 500).json({
    message: err.message,
    error: err,
  });
});

app.get("/health", (_request, response) => {
  return response.status(200).json({ message: "health route is ok" });
});

module.exports = app;
