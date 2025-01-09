const express = require("express");
const { dailyTask } = require("./task.controller");
const router = express.Router();

router.post("/buy-product", dailyTask);

module.exports = router;
