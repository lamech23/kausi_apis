const Details = require("../models/UploadModals.js");
const { Op } = require("sequelize");
const imageUrl = require("../models/imageModel.js");

const relatedHouses = async (req, res) => {
  const q = req.query.category;
  try {
    const details = await Details.findAll({
      where: {
        category: {
          [Op.eq]: q,
        },
      },
      include: {
        model: imageUrl,
        as: "images",
      },
    });

    if (details.length > 0) {
      res.status(200).json(details);
    } else {
      res
        .status(404)
        .json({  
          success:false,
          message: "No details found for the specified category" });
    }
  } catch (error) {
    res.status(500);
  }
};

module.exports = { relatedHouses };
