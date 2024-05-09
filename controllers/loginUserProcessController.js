const loginProccess = require("../models/loginProcessModel");
const { Op } = require("sequelize");

const userLoginProccess = async (req, res) => {
  try {
    const { email, message } = req.body;
    console.log(req.body);

    const createRequest = await loginProccess.create(req.body);

    if (createRequest) {
      return res.status(200).json({ message: "Request sent  successfully!" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Failed to send request" });
  }
};

const getRequest = async (req, res) => {
  try {
    const today = new Date();
    const startOfToday = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const requests = await loginProccess.findAll({
      where: {
        read: false,
        createdAt: {
          [Op.gte]: startOfToday,
        },
      },
    });
    if (requests) {
      res.status(200).json({ requests });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "request not found " });
  }
};

// updating the status for the request
const updateStatus = async (req, res) => {
  const id = req.params.id;

  const requestStatus = { read: req.query.read };

  try {
    const requests = await loginProccess.update(requestStatus, {where: {id: id}});
    res.status(200).json(requests);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  userLoginProccess,
  getRequest,
  updateStatus
};
