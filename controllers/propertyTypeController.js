const propertyType = require("../models/propertyType.js");

const getAllPropertyType = async (req, res) => {
  try {
    const allPropertyType = await propertyType.findAll();

    res.json({ allPropertyType });
  } catch (error) {
    res.json({ message: error.message });
  }
};

const createPropertyType = async (req, res) => {
  try {
    const newType = await propertyType.create({
      type: req.body.type,
    });
    res.json(newType);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const updatePropertyType = async (req, res) => {
  let id = req.params.id;
  let update = {};

  if (req.body.name) update.name = req.body.name;

  try {
    const resp = await propertyType.update(update, { where: { id: id } });
    res.status(200).send(resp);
  } catch (error) {
    res.json({ message: error.message });
  }
};

const deletePropertyType = async (req, res) => {
  try {
    await propertyType.destroy({
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
  getAllPropertyType,
  createPropertyType,
  updatePropertyType,
  deletePropertyType,
};
