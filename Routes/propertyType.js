const express = require("express");

const {
    getAllPropertyType,
  createPropertyType,
  updatePropertyType,
  deletePropertyType
} = require("../controllers/propertyTypeController");
const { hasAdmin } = require("../middlleware/checkRoles");
const { verifyToken } = require("../middlleware/token");

const CategoryRoutes = express.Router();

CategoryRoutes.get("/fetch",verifyToken, getAllPropertyType);
CategoryRoutes.post("/", verifyToken, hasAdmin, createPropertyType);
CategoryRoutes.patch("/:id", verifyToken, hasAdmin, updatePropertyType);
CategoryRoutes.delete("/:id",  verifyToken, hasAdmin,  deletePropertyType,
);

module.exports = CategoryRoutes;
