const userAccount = require("../models/accountModel");
const cloudinary = require("cloudinary").v2;

const createAccount = async (req, res) => {
  try {
    const token = req.user;
    const user_id = token.userId.id;

    const file = req.file;

    const result = await cloudinary.uploader.upload(file.path, {
      folder: "=Images",
    });
    const accountDetails = {
      userId: user_id,
      image: result.secure_url,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      phoneNumber: req.body.phoneNumber,
      bio: req.body.bio,
      gender: req.body.gender,
    };

    const newAccount = await userAccount.create(accountDetails);

    if (newAccount) {
      return res.status(201).json({
        success: true,
        account: newAccount,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to add account",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      err,
    });
  }
};

const fetchAccount = async (req, res) => {
  try {
    const token = req.user;
    const userid = token.userId.id;

    const account = await userAccount.findOne({
      where: {
        userId: userid,
      },
    });

    if (account) {
      return res.status(200).json({
        success: true,
        image: account.dataValues.image,
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "No Image Found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createAccount,
  fetchAccount,
};
