const express = require("express");
const {
  dailyTask,
  filterTasksById,
  deleteTaskById,
} = require("./task.controller");
const router = express.Router();

router.post("/buy-product", dailyTask);
router.get("/filter/:id", filterTasksById);
router.delete("/delete-task/:id", deleteTaskById);

module.exports = router;
