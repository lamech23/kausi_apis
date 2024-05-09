const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const Details = require("./UploadModals");


const Category = db.define(
  "category",
  {
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTableName: true,
  }
);


db.sync();

module.exports = Category;
