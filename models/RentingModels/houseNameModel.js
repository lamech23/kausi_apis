const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");

const houseName = db.define(
  "house_name",
  {
    house_name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
houseName.belongsTo(users, {
  foreignKey: "user_id",
  as: "houseName",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.sync()
  .then(() => {
    console.log("HouseName table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create houseName table", error);
  });

module.exports = houseName;
