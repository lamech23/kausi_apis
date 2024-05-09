const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");
const Details = require("../UploadModals");


const water = db.define(
  "waters",
  {
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    house_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
        type: DataTypes.INTEGER,
      },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);
water.belongsTo(users, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "cascade",
  onUpdate: "cascade",
});
water.belongsTo(Details, {
    foreignKey: "house_id",
    as: "house",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  db.sync()
  .then(() => {
    console.log("waters table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create waters table", error);
  });
  module.exports = water;