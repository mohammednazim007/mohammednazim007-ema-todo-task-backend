const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const middleware = [cors(), morgan("dev"), express.json()];

module.exports = middleware;
