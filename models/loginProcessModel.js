const { DataTypes } = require("sequelize");
const db = require("../config/Database");

const loginProccess = db.define(
  "loginsVerification",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },

    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      default: false
    }
   
   
  },
  {
    freezeTablesName: true,
  }
);

db.sync()
  .then(() => {
    console.log("loginProccess table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create loginProccess table", error);
  });

  

module.exports = loginProccess;
