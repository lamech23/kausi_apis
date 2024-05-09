const Details = require("../models/UploadModals.js");
const Tours = require("../models/TourRequestModel.js");
const nodemailer = require("nodemailer");
const users = require("../models/UserModels.js");
const fs = require("fs");
const imageUrl = require("../models/imageModel.js");
const agentManagmentTable = require("../models/agentManagment.js");
// for landing page
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getAllHouses = async (req, res) => {
  const page_size = 4;
  try {
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * page_size;
    const pageNumbers = [];

    const allHousesWithImage = await Details.findAndCountAll({
      offset: offset,
      limit: page_size,
      order: req.query.sort ? sqs.sort(req.query.sort) : [["id", "desc"]],
      include: [
        {
          model: imageUrl,
          as: "images",
        },
        {
          model: users,
          as: "houses",
        },
      ],
    });

    const totalPages = Math.ceil(allHousesWithImage.count / page_size);

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }

    res.status(200).json({
      allHousesWithImage,
      pagination: {
        totalItems: allHousesWithImage.count,
        totalPages: pageNumbers,
        currentPage: page,
        currentPosts: allHousesWithImage.rows,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getAllHousesByName = async (req, res) => {
  const user = req.user;
  const userRole = user.userId.role;
  const id = user.userId.id;

  switch (userRole) {
    case "admin":
      try {
        let details = await Details.findAll({
          include: {
            model: users,
            as: "houses",
          },
        });
        res.status(200).send({ details });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }

      break;

    case "agent":
      try {
        let house = await agentManagmentTable.findAll({
          where: {
            agentId: id,
          },
          include: [
            {
              model: Details,
              as: "house",
              attributes: ["type", "houseName"],
            },
          ],
        });
        let details = house.map((detail) => {
          return {
            type: detail.house.type,
            houseName: detail.house.houseName,
          };
        });

        res.status(200).json({ details });
      } catch (error) {
        res.status(500).json({ error: "Internal server error" });
      }
      break;

    default:
      res.status(403).json({ error: "Forbidden" });
  }
};

const fetchHousesByNames = async (req, res) => {
  try {
    const details = await Details.findAll({
      include: {
        model: users,
        as: "houses",
      },
    });
    res.status(200).json({ details });
  } catch (error) {
    res.status(403).json({
      message: "no house found ",
      success: false,
      error: error.message,
    });
  }
};

// GET all uploads
const getAllDetails = async (req, res) => {
  try {
    const user_id = req.query.user_id;
    const details = await Details.findAll({
      where: {
        user_id: user_id,
      },
      include: {
        model: imageUrl,
        as: "images",
      },
    });
    res.status(200).json({ details });
  } catch (error) {
    res.status(400).json("nop");
  }
};

const ownCompound = async (req, res) => {
  try {
    let Bangalo = await Details.findAll({
      where: { category: "Bungalow" },
    });
    res.status(200).json(Bangalo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const RentalHouse = async (req, res) => {
  try {
    let Maisonette = await Details.findAll({
      where: { category: "Maisonette" },
    });
    res.status(200).json(Maisonette);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const BnBHouse = async (req, res) => {
  try {
    let Apartments = await Details.findAll({
      where: { category: "Apartments" },
    });
    res.status(200).json(Apartments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Get a single upload
const getSingelDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const details = await Details.findOne({
      where: { id: id },
      include: {
        model: imageUrl,
        as: "images",
      },
    });

    res.status(200).json({ details });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Cant get the single details for " });
  }
};

//CREATE an upload
const createDetails = async (req, res) => {
  // const id = req.params;
  const token = req.user?.userId;
  const user_id = token.id;
  const imageUrls = [];

  const info = {
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    contact: req.body.contact,
    category: req.body.category,
    price: req.body.price,
    houseName: req.body.houseName,
    type: req.body.type,
    units: req.body.units,
    user_id: user_id,
    details_id: imageUrl.id,
  };

  try {
    const userInfo = await users.findOne({ where: { id: user_id } });

    if (userInfo.verified === false) {
      return res.status(403).json({
        error: "Please verify your account first ...",
        redirect: "/account/userVerification",
      });
    } else {
      const details = await Details.create(info);
      for (const file of req.files) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "=Images",
          });
          const imagePath = await imageUrl.create({
            image: result.secure_url,
            user_id: user_id,
            details_id: details.id,
          });
          imageUrls.push(imagePath);
        } catch (error) {
          console.error("Upload failed:", error);
        }
      }

      res.status(200).json({
        success: true,
        data: imageUrls,
        data: details,
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "lamechcruze@gmail.com",
          pass: "fdbmegjxghvigklv",
        },
      });

      //email option
      const mailOption = {
        to: `lamechcruze@gmail.com`,
        subject: "Post Alert ",
        html:
          " Hello Admin\n\n" +
          `<p>You are reciving this email because ${userInfo?.email}  
          who's role is ${userInfo?.role} has posted a house at freyton property agencies.</p> :\n`,
      };
      transporter.sendMail(mailOption, (err, response) => {
        if (err) {
          console.log("There was an error", err);
        } else {
          console.log("There was a response ", response);
          res.status(200).json(" email sent ");
        }
      });
    }
  } catch (error) {
    res.status(400).json({ mssg: error.message });
    console.log("something went wrong", error);
  }
};

const RequstingAtour = async (req, res) => {
  const id = req.params;
  const info = {
    selectedDate: req.body.selectedDate,
    time: req.body.time,
    tour_id: req.body.tour_id,
  };

  try {
    const response = await Tours.create(info);

    await users.findOne({
      where: {
        id: id,
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "lamechcruze@gmail.com",
        pass: "fdbmegjxghvigklv",
      },
    });
    //email option

    const mailOption = {
      // from:'brian@gmail.com',
      to: `lamechcruze@gmail.com`,
      subject: "Tour Alert ",
      html:
        " Hello Admin\n\n" +
        `<p>You are reciving this email because user has requested a tour.</p> :\n\n`,
    };
    // end of else

    transporter.sendMail(mailOption, (err, response) => {
      if (err) {
        console.log("There was an error", err);
        message;
      } else {
        console.log("There was a response ", response);
        res.status(200).json(" email sent ");
      }
    });
  } catch (error) {
    res.status(400).json({ mssg: error.error });
  }
};

const getAllTours = async (req, res) => {
  const id = req.params;
  const tour = await Tours.findAll({});

  res.status(200).json(tour);
};

//GET DETAILS BY ID
const grtDetailsById = async (req, res) => {
  const { id } = req.params;
  try {
    const details = await Details.findOne({
      where: {
        id: id,
      },
    });

    res.status(200).json(details);
  } catch (error) {
    return res.status(400).json({ error: "Details doesn't] exist " });
  }
};

//DELETE an upload
const deleteDetails = async (req, res) => {
  const { id } = req.params;
  const details = await Details.destroy({
    where: {
      id: id,
    },
  });
  if (!details) {
    return res.status(400).json({ error: "Details doesn't exist " });
  }
  res.status(200).json(details);
};
//UPDATE a upload
const updateDetails = async (req, res) => {
  const id = req.params.id;
  const info = {
    title: req.body.title,
    location: req.body.location,
    description: req.body.description,
    contact: req.body.contact,
    category: req.body.category,
    price: req.body.price,
  };

  if (req.file) {
    info.image = req.file.path;
  }
  const details = await Details.update(info, {
    where: {
      id: id,
    },
  });

  if (!details) {
    return res.status(400).json({ error: "Details doesn't exist " });
  }
  res.status(200).json(details);
};

const getProductsInCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const getCategory = await Details.findAll({
      where: { category },
      include: [{ model: imageUrl, as: "images" }],
    });
    if (getCategory) {
      res.status(200).json({ getCategory });
    }
  } catch (error) {
    res.status(403).json({
      success: false,
      error: error.message,
    });
  }
};

const getRelevantAgentToAhouse = async (req, res) => {
  try {
    const user = req.user;
    const agentId = user.id;

    const relevantAgent = await agentManagmentTable.findAll({
      include: [
        {
          model: users,
          as: "agent",
        },
      ],
    });

    if (relevantAgent) {
      res.status(200).json({ relevantAgent });
    } else {
      res.status(404);
    }
  } catch (error) {}
};

// const deletingHouseAdminSide = async(req, res )=>{
//   try {
//     const { id } = req.params;
//     const details = await Details.destroy({
//       where: {
//         id: id,
//       },
//     });
//     if (!details) {
//       return res.status(400).json({ error: "Details doesn't exist " });
//     }
//     res.status(200).json(details);
//   } catch (error) {

//   }
// }

module.exports = {
  createDetails,
  getSingelDetails,
  getAllDetails,
  deleteDetails,
  updateDetails,
  ownCompound,
  RentalHouse,
  BnBHouse,
  grtDetailsById,
  getAllHouses,
  RequstingAtour,
  getAllTours,
  getAllHousesByName,
  getProductsInCategory,
  fetchHousesByNames,
  getRelevantAgentToAhouse,
};
