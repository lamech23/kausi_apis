const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");
const Details = require("../UploadModals");


const garbagePrice = db.define(
  "garbages",
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
garbagePrice.belongsTo(users, {
  foreignKey: "user_id",
  as: "user",
  onDelete: "cascade",
  onUpdate: "cascade",
});
garbagePrice.belongsTo(Details, {
    foreignKey: "house_id",
    as: "house",
    onDelete: "cascade",
    onUpdate: "cascade",
  });

  db.sync()
  .then(() => {
    console.log("garbage table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create garbage table", error);
  });
  module.exports = garbagePrice;