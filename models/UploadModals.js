const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const imageUrl = require("./imageModel");
const users = require("./UserModels");

const Details = db.define(
  "Details",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    houseName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      // allowNull: false

    },
    units: {
      type: DataTypes.STRING,
      // allowNull: false

    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);
Details.belongsTo(users, {
  foreignKey: "user_id",
  as: "houses",
  onDelete: "cascade",
  onUpdate: "cascade",
});

imageUrl.belongsTo(Details, {
  foreignKey: "details_id",
  as: "details",
  onDelete: "cascade",
  onUpdate: "cascade",
});

Details.hasMany(imageUrl, {
    foreignKey: "details_id",
    as: "images",
    onDelete: "cascade",
    onUpdate: "cascade",
});


db.sync()
  .then(() => {
    console.log("Details table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create Details table", error);
  });

module.exports = Details;
