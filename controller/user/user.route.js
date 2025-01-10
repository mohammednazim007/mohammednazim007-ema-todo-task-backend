const express = require("express");
const {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("./user.controller");
const router = express.Router();

router.get("/get-categories", getCategories);
router.post("/add-category", addCategory);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

module.exports = router;
