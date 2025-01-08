const express = require("express");
const { dailyTask } = require("./task.controller");
const router = express.Router();

router.post("/create-daily-task", dailyTask);

module.exports = router;
