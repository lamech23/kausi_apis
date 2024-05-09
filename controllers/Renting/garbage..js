const garbagePrice = require("../../models/RentingModels/garbageModel");
const Details = require("../../models/UploadModals");

const createGarbagePrice = async (req, res) => {
  const token = req.user;
  const user_id = token.id;

  const garbageDetails = {
    price: req.body.price,
    user_id: user_id,
    house_id: req.body.house_id,
  };
  try {
    const createdGarbage = await garbagePrice.create(garbageDetails);
    res.status(200).send({
      createdGarbage,
      success: true,
      message: " garbagePrice readings created successfuly ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// fetching water based on the house_id and the the associated house
const getGarbagePrice = async (req, res) => {
  const house_id = req.params.id;
  try {
    const getGarbage = await garbagePrice.findAll({
      where: {
        house_id: house_id,
      },
      include: {
        model: Details,
        as: "house",
      },
    });
    res.status(200).json({
      getGarbage,
      success: true,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message,
    });
  }
};

const deleteGarbage = async (req, res) => {
  try {
    const id = req.params.id; // getting the id from the params
    await garbagePrice.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "water not found ",
    });
  }
};
module.exports = {
  createGarbagePrice,
  getGarbagePrice,
  deleteGarbage,
};
