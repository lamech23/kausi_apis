
const { Op } = require("sequelize");
const Details = require("../models/UploadModals.js");

const getSearch = async (req, res) => {
  const { keyword } = req.params;

  if (!keyword) {
    return res
      .status(400)
      .json({ message: "Keyword is required for user search." });
  }

  try {
    const keys = ["id","title", "price", "category"];
    const limit = 4;

    const products = await Details.findAll({
      where: {
        [Op.or]: {

        category: { [Op.like]: `%${keyword}%` },
        price: { [Op.like]: `%${keyword}%` },
        location: { [Op.like]: `%${keyword}%` },
        houseName: { [Op.like]: `%${keyword}%` },
        }
      },
      limit: limit,
      attributes: keys,
    });

    // Filter by keyword manually (if needed)
    // const filteredProducts = products.filter((item) =>
    //   keys.some((key) => {
    //     const value = item[key]; // This line retrieves the value of the current item corresponding to the current key 
    //     return value && typeof value === "string" && value.toLowerCase().includes(keyword);
    //   })
    // );

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      
       error: "Internal server error" });
  }
};


const searchForTenant = async (req, res) => {
  const { keyword } = req.params;

  if (!keyword) {
    return res
      .status(400)
      .json({ message: "Keyword is required for user search." });
  }

  try {
    const keys = ["id","title", "price", "category"];
    const limit = 4;

    const products = await Details.findAll({
      where: {
        [Op.or]: {

        category: { [Op.like]: `%${keyword}%` },
        price: { [Op.like]: `%${keyword}%` },
        location: { [Op.like]: `%${keyword}%` },
        houseName: { [Op.like]: `%${keyword}%` },
        }
      },
      limit: limit,
      attributes: keys,
    });

    // Filter by keyword manually (if needed)
    // const filteredProducts = products.filter((item) =>
    //   keys.some((key) => {
    //     const value = item[key]; // This line retrieves the value of the current item corresponding to the current key 
    //     return value && typeof value === "string" && value.toLowerCase().includes(keyword);
    //   })
    // );

    res.status(200).json({products});
  } catch (error) {
    res.status(500).json({
      
       error: "Internal server error" });
  }
};
module.exports = {
  getSearch,
};

