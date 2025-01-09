const express = require("express");
const { dailyTask, filterTasksById } = require("./task.controller");
const router = express.Router();

router.post("/buy-product", dailyTask);
router.get("/filter/:id", filterTasksById);

module.exports = router;
