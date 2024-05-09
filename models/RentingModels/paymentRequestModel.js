const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");

const paymentRequest = db.define(
  "paymentRequests",
  {
    image: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: "open",
      }
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);
paymentRequest.belongsTo(users, {
  foreignKey: "userId",
  as: "user",
});


users.hasMany(paymentRequest, {
  foreignKey: "userId",
  as: "payment",
});



db.sync()
  .then(() => {
    console.log("paymentRequest table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create paymentRequest table", error);
  });

module.exports = paymentRequest;
