const HouseRegistration = require("../../models/RentingModels/HouseRegisteringModel");
const tenantRegistration = require("../../models/RentingModels/RegisterTenantModel");

const users = require("../../models/UserModels");
const houseName = require("../../models/RentingModels/houseNameModel");
const sequelize = require("sequelize");
const { Op } = require("sequelize");
const water = require("../../models/RentingModels/waterModel");
const Details = require("../../models/UploadModals");

// const users = require("../../models/UserModels.js");

const getAllHouses = async (req, res) => {

  const page_size = 10;
  const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * page_size;
    const pageNumbers = [];


  const details = await tenantRegistration.findAndCountAll({
    offset: offset,
    limit: page_size,
    where: {
      houseId:  req.params.houseId
    },
    include:[
      {model : users , as:'tenant'}
    ]
  });


  try {
    // Calculating the total expenses for each user
    const detailsWithTotal = details?.rows?.map((detail) => {
      const totalExpenses = [
        Number(detail.waterBill) || 0,
        Number(detail.rent) || 0,
        Number(detail.rentDeposit) || 0,
        Number(detail.garbage) || 0,
      ].reduce((acc, currentValue) => acc + currentValue, 0);
      // water readings
      const totalWaterReadings = [
        Number(detail.prevReadings) || 0,
        Number(detail.currentReadings) || 0,
      ].reduce((acc, current) => current - acc, 0);
      const balance =   Number(detail.rent)  - Number(detail.payableRent);

     
      return {
        ...detail.dataValues,
        totalExpenses,
        totalWaterReadings,
        balance,
      };
    });
    const totalPages = Math.ceil(detailsWithTotal.length / page_size);
    console.log(totalPages);

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }


    res.status(200).json({
      detailsWithTotal,
      pagination: {
        totalItems: detailsWithTotal.length,
        totalPages: pageNumbers,
        currentPage: page,
        currentPosts: detailsWithTotal,
      }
    })
   
    // res.status(200).json({ detailsWithTotal });
  } catch (error) {
    res.status(400).json(error.message);
  }
};


const subtotal = async (req, res) => {
  const { id } = req.params;
  try {
    const details = await tenantRegistration.findOne({
      where: { id },
    });
    const detail = [
      details.waterBill,
      details.rent,
      details.rentDeposit,
      details.garbage,
    ];
    let totalSum = 0;

    for (let i = 0; i < detail.length; i++) {
      totalSum += Number(detail[i]);
    }
    res.status(200).json(totalSum);
  } catch (error) {
    res.status(500).json(error.message);
  }
};
// this get all the tenants that are registerd to as specific house name
// eg house k-50 under a landowner

const getTenants = async (req, res) => {
  const token = req.user;
  const user_id = token.id;

  try {
    const tenats = await Details.findAll({
      where: {
        user_id: user_id,
      },
    });
    const landownerHousename = tenats.map((landOwnerHouse) => {
      return landOwnerHouse.house_name;
    });
    const tenatsHouse = await tenantRegistration.findAll({
      where: {
        houseName: landownerHousename,
      },
    });
    const tenantDetals = Array.isArray({ tenats, tenatsHouse });

    if (tenantDetals === true && tenats.length === 0) {
      return res.status(404).json({
        succese: false,
        message: "house does not exist ",
      });
    }

  res.status(200).json({tenatsHouse});

  } catch (error) {
    // res.status(400).json({ error: error.message });
  }
};

const getTenantForTenantRegistration = async (req, res) => {
  try {
    const getHouses = await houseName.findAll({});

    res.status(200).json(getHouses);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const RegisteringHouse = async (req, res) => {
  const { house_name, full_name, user_name, contact, location, user_id } =
    req.body;

  try {
    const HouseEntry = await HouseRegistration.create({
      house_name,
      full_name,
      user_name,
      contact,
      location,
      user_id,
    });

    res.status(200).json(HouseEntry);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const creatHouseCategory = async (req, res) => {
  try {
    const details = {
      house_name: req.body.house_name,
      user_id: req.body.user_id,
    };

    const houseNameDetails = await houseName.create(details);
    res.status(200).json(houseNameDetails);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllHousesByName = async (req, res) => {
  try {
    const details = await Details.findAll({
      include: {
        model: users,
        as: "houses",
      },
    });
    res.status(200).json({details});
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getHouseByHouseName = async (req, res) => {
  try {
    const { houseName } = req.query;

    const specificHouses = await tenantRegistration.findAll({
      where: {
        houseName: houseName,
      },
    });

    res.status(200).json({ specificHouses });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  RegisteringHouse,
  getTenants,
  getAllHouses,
  subtotal,
  creatHouseCategory,
  getAllHousesByName,
  getTenantForTenantRegistration,
  getHouseByHouseName,
};
