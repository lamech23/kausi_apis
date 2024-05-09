const Details = require("../models/UploadModals.js");
const users = require("../models/UserModels.js");
const fs = require("fs");

const getHouses = async (req, res) => {
  const page_size = 4;

  // // const count=0
  try {
    const page = parseInt(req.query.page || "0");

    const user_id = req.body.user_id;
    const houses = await Details.findAll({
      // limit:page_size,
      order: req.query.sort ? sqs.sort(req.query.sort) : [["id", "desc"]]
    });
    const binaryBlob = fs.readFileSync(
      `http://localhost:5000/${Details.image}`
    );

    const buffer = Buffer.from(binaryBlob, "binary");

    // create a base64-encoded string from the buffer

    // convert buffer to base64 encoded string
    const encodedImage = buffer.toString("base64");
    res.status(200).json(encodedImage);
  } catch (error) {
    res.status(500).json({ mmg: "nop" });
  }
};

module.exports = { getHouses };
