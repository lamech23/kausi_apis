const express = require("express");

const {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require("../controllers/category.js");

const CategoryRoutes = express.Router();
const { hasAdmin } = require("../middlleware/checkRoles");
const { verifyToken } = require("../middlleware/token.js");


CategoryRoutes.get("/fetch", getAllCategory);
CategoryRoutes.post("/", verifyToken, hasAdmin, createCategory);
CategoryRoutes.patch("/:id",verifyToken, hasAdmin,updateCategory);
CategoryRoutes.delete("/:id",verifyToken, hasAdmin, deleteCategory);

module.exports = CategoryRoutes;
