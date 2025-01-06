const express = require("express");
const {
  addCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("./user.controller");
const router = express.Router();

router.get("/get-categories", getCategories);
router.put("/add-category", addCategory);
router.patch("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);

module.exports = router;
