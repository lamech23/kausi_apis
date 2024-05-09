const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");

const category = db.define(
  "category",
  {
    cat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
    user_id:{
      type: DataTypes.INTEGER,

    }
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);
category.belongsTo(users, {
    foreignKey: "user_id",
    as: "user",
    onDelete: "cascade",
    onUpdate: "cascade",
  });


db.sync()
  .then(() => {
    console.log("category table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create category table", error);
  });

module.exports = category;
