const express = require("express");
const { addCategory } = require("./user.controller");
const router = express.Router();

// add task
router.put("/add-category", addCategory);

module.exports = router;
