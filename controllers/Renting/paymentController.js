const tenantRegistration = require("../../models/RentingModels/RegisterTenantModel");
const payments = require("../../models/RentingModels/additionalPaymentsModel");
const paymentRequest = require("../../models/RentingModels/paymentRequestModel");
const Details = require("../../models/UploadModals");
const cloudinary = require("cloudinary").v2;

const addPayment = async (req, res) => {
  const token = req.user.userId;
  const user_id = token.id;

  const file = req.file;

  try {
    const result = await cloudinary.uploader.upload(file.path, {
      folder: "=Images",
    });
    const paymentDetails = {
      userId: user_id,
      image: result.secure_url,
    };

    const createPayment = await paymentRequest.create(paymentDetails);
    res.status(200).send({
      createPayment,
      success: true,
      message: " payment  created successfuly ",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllPaymentsForAdminSide = async (req, res) => {

  try {
    const payments = await paymentRequest.findAll({
      where: {
        status: "open",
      }
   
    });

    if (payments) {
      //get the is userId from the returned payments
      const userId = payments.map((item) => item.userId);
      // find  all tenant with the above  userId
      const tenant = await tenantRegistration.findAll({
        where: {
          userId: userId,
        },
      });

      const tenantMap = {};
      //matching the  tenant.userId in tenantMap is similar hence retriving the recorde
      tenant.forEach((tenant) => {
        return (tenantMap[tenant.userId] = tenant);
      });

      const houseIds = [...new Set(tenant.map((tenant) => tenant.houseId))];

      const houses = await Details.findAll({
        where: {
          id: houseIds,
        },
      });

      const houseMap = {};
      houses.forEach((house) => {
        return (houseMap[house.id] = house);
      });
      const paymentsWithTenants = payments.map((payment) => {
        const userId = payment.userId;
        const tenantsHouse = tenant.find((tenant) => tenant.userId === userId);

        const houseDetails = houseMap[tenantsHouse.houseId];
        const tenantDetails = tenantMap[userId];

        return {
          ...payment.toJSON(),
          tenant: tenantDetails || {},
          house: houseDetails || {},
        };
      });

      res.status(200).json({
        paymentsWithTenants,
      });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const singlePaymentsForAdminSide = async (req, res) => {
  try {
    // Find a single open payment with its associated user
    const payment = await paymentRequest.findOne({
      where: {
        status: "open",
      }
    
      
    });

    if (!payment) {
      return res.status(404).json({ error: "No open payment found" });
    }

    const userId = payment.userId;

    // Find the tenant details for the user associated with the payment
    const tenant = await tenantRegistration.findOne({
      where: {
        userId: userId,
      },
    });

    if (!tenant) {
      return res.status(404).json({ error: "No tenant found for user" });
    }

    // Find the house details based on the tenant's houseId
    const house = await Details.findOne({
      where: {
        id: tenant.houseId,
      },
    });

    if (!house) {
      return res
        .status(404)
        .json({ error: "No house details found for tenant" });
    }

    // Prepare the response with payment, tenant, and house details
    const paymentWithDetails = {
      id: payment.id,
      image: payment.image,

      tenant: {
        id: tenant.id,
        email: tenant.email,
        houseNumber: tenant.houseNumber,
      },
      house: {
        id: house.id,
        houseName: house.houseName,
      },
    };

    res.status(200).json({ payment: paymentWithDetails });
  } catch (error) {
    console.error("Error fetching payment details:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePaymentStatus = async (req, res) => {
  const id = req.params.id;

  const paymentStatus = { status: req.query.status };

  try {
    const payment = await paymentRequest.update(paymentStatus, {
      where: { id: id },
    });
    res.status(200).json(payment);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const paymentsRequestForSpecifcUser = async (req, res) => {
  const token = req.user;
  const id = token.userId.id;

  try {
    const payments = await paymentRequest.findAll({
      where: {
        userId: id,
      },
    });
    if (payments) {
      res.status(200).json({ payments });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const allPayments = async (req, res) => {
  try {
    const payment = await paymentRequest.findAll({});

    const transactions = await payments.findAll({
      attributes: ["amount"],
    });
    if (payment && transactions) {
      res.status(200).json({ payment, transactions });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};
module.exports = {
  addPayment,
  getAllPaymentsForAdminSide,
  updatePaymentStatus,
  singlePaymentsForAdminSide,
  paymentsRequestForSpecifcUser,
  allPayments,
};
