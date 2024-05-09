const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");

const HouseRegistration = db.define(
  "register_house",
  {
    house_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_name: {
      type: DataTypes.STRING,
    },

    contact: {
      type: DataTypes.INTEGER,
    },
    location: {
      type: DataTypes.STRING,
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
HouseRegistration.belongsTo(users, {
  foreignKey: "user_id",
  as: "users",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.sync()
  .then(() => {
    console.log("HouseRegistration table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create HouseRegistration table", error);
  });

module.exports = HouseRegistration;
