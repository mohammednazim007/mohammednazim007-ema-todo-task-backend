const express = require("express");
const { addTask } = require("./user.controller");
const router = express.Router();

// add task
router.post("/add-task", addTask);

module.exports = router;
