const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const users = require("./UserModels");

const userAccount = db.define(
  "accounts",
  {
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,

    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    phoneNumber: {
      type: DataTypes.BIGINT,
      allowNull: false,

    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,

    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);
userAccount.belongsTo(users, {
  foreignKey: "userId",
  as: "user",
});



db.sync()
  .then(() => {
    console.log("accounts table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create accounts table", error);
  });

module.exports = userAccount;
