const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const users = require("./UserModels");
const Details = require("./UploadModals")

const imageUrl = db.define(
  "imageUrl",
  {
    image: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    details_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTablesName: true,
  }
);

imageUrl.belongsTo(users, {
  foreignKey: "user_id",
  as: "imagePath",
  onDelete: "cascade",
  onUpdate: "cascade",
});



db.sync()
  .then(() => {
    console.log("imageUrl table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create imageUrl table", error);
  });

module.exports = imageUrl;
