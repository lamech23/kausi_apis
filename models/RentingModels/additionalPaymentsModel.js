const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");

const payments = db.define(
  "payments",
  {
    amount: {
      type: DataTypes.STRING,
    },
    paymentType: {
      type: DataTypes.STRING,
    },
    dateTime: {
      type: DataTypes.STRING,
    },

    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);
payments.belongsTo(users, {
  foreignKey: "userId",
  as: "payments",
});

db.sync()
  .then(() => {
    console.log("payments table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create payments table", error);
  });

module.exports = payments;
