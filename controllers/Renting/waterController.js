const water = require("../../models/RentingModels/waterModel");
const Details = require("../../models/UploadModals");

const createWater = async (req, res) => {
  const token = req.user;
  const user_id = token.id;

  const waterDetails = {
    price: req.body.price,
    user_id: user_id,
    house_id: req.body.house_id,
  };
  try {
    const createdWater = await water.create(waterDetails);
    res.status(200).send({
      createdWater,
      success: true,
      message: " water readings created successfuly ",
    });
    // console.log("this water " ,createdWater);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// fetching water based on the house_id and the the associated house 
const getWater = async (req, res) => {
  const house_id = req.params.id;
  try {
    const getWater = await water.findAll({
      where: {
        house_id: house_id,
      },
      include:{
        model: Details,
        as: "house"
      }
    });
    res.status(200).json({
    getWater, 
    success: true
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message

    })
  }
};

const deleteWater = async (req, res) => {
  try {
    const id = req.params.id // getting the id from the params
     await water.destroy({
      where:{
        id:id
      }
    });
  } catch (error) {
    res.status(500).json({
      success:false,
      message: "water not found "
    })
  }
};
module.exports = {
  createWater,
  getWater,
  deleteWater
};
