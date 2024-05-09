const Details = require("../models/UploadModals.js");
const Category = require("../models/category.js");

const getAllCategory = async (req, res) => {
  try {
    const listAllCategories = await Category.findAll();

    res.json(listAllCategories);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createCategory = async (req, res) => {
  try {
    const newCategory = await Category.create({
      name: req.body.name,
    });
    res.json(newCategory);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updateCategory = async (req, res) => {
  let id = req.params.id;
  let update = {};

  if (req.body.name) update.name = req.body.name;

  try {
    const resp = await Category.update(update, { where: { id: id } });
    res.status(200).send(resp);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json({
      message: "Category Successfully  Deleted",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};



module.exports = {
  getAllCategory,
  createCategory,
  updateCategory,
  deleteCategory,

};
