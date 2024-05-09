const { DataTypes } = require("sequelize");
const db = require("../config/Database");

const propertyType = db.define(
  "propertyType",
  {
    type: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);

db.sync();

module.exports = propertyType;
