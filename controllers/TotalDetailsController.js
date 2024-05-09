const Details = require("../models/UploadModals.js");
const NewsLetter = require("../models/NewsLetterModel");
const users = require("../models/UserModels.js");


const getStats = async (req, res) => {
  let count = 0;
  let count2 = 0;
  let count3 =0

  try {
    const details = await NewsLetter.findAll({});
    const user = await users.findAll({});
    const houses = await Details.findAll({});


    count = details.length;
    count2 = user.length;
    count3 = houses.length

    //active users
    const activeUsers = user.filter((user) => user.Active === "active");
    const activeUser = activeUsers.length;

    //tenants

    const tenants = user.filter((user) => user.role === "tenant");
    const Tenant = tenants.length;
    //landowners

    const landowner = user.filter((user) => user.role === "landowner");
    const Landlord = landowner.length;

    res.status(200).json({ count, count2, activeUser, Tenant, Landlord ,count3 });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  getStats,
};
