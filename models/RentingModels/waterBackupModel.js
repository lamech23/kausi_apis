const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const users = require("../UserModels");
const houseName = require("./houseNameModel");
const tenantRegistration = require("./RegisterTenantModel");

const waterStore = db.define(
  "waterBackups",
  {
    currentReadings: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    house_id: {
      type: DataTypes.INTEGER,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
    tenant_id: {
      type: DataTypes.INTEGER,
    },
    EntryDate : {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);
waterStore.belongsTo(users, {
  foreignKey: "user_id",
  as: "water",
  onDelete: "cascade",
  onUpdate: "cascade",
});
waterStore.belongsTo(houseName, {
  foreignKey: "house_id",
  as: "houseWater",
  onDelete: "cascade",
  onUpdate: "cascade",
});
waterStore.belongsTo(tenantRegistration, {
  foreignKey: "tenant_id",
  as: "tenant",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.sync()
  .then(() => {
    console.log("waterBackup table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create waterBackup table", error);
  });
module.exports = waterStore;
