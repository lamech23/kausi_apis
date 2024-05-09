const { DataTypes } = require("sequelize");
const db = require("../../config/Database");
const HouseRegistration = require("../RentingModels/HouseRegisteringModel");
const Details = require("../UploadModals");
const users = require("../UserModels");

const tenantRegistration = db.define(
  "tenant_info",
  {
    tenantsName: {
      type: DataTypes.STRING,
    },
    houseNumber: {
      type: DataTypes.STRING,
    },
    rent: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    rentDeposit: {
      type: DataTypes.STRING,
    },
    waterReading: {
      type: DataTypes.STRING,
    },
   

    userName: {
      type: DataTypes.STRING,
    },
    payableRent: {
      type: DataTypes.STRING,
    },

    previousBalance: {
      type: DataTypes.BIGINT,
    },

    phoneNumber: {
      type: DataTypes.STRING,
    },
    nextOfKingNumber: {
      type: DataTypes.STRING,
    },

    prevReadings: {
      type: DataTypes.STRING,
    },
    currentReadings: {
      type: DataTypes.STRING,
      defaultValue: 0,
    },
    houseId: {
      type: DataTypes.INTEGER,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
         model: users,
         key: 'id',
        },
    },
    rentPaymentDate: {
      type: DataTypes.STRING,
    },
  },
  {
    freezeTablesName: true,
    timestamps: true,
  }
);
tenantRegistration.belongsTo(users,
   { 
    foreignKey: 'userId',
    as: "tenant",

    onDelete: "cascade",
    onUpdate: "cascade",
    
  });

users.hasMany(tenantRegistration,
  { 
   foreignKey: 'userId',
   as: "tenant",
   onDelete: "cascade",
   onUpdate: "cascade",
   
 });
tenantRegistration.belongsTo(Details, {
  foreignKey: "houseId",
  as: "tenentHouse",
  onDelete: "cascade",
  onUpdate: "cascade",
});
Details.hasMany(tenantRegistration, {
  foreignKey: "houseId",
  as: "tenentHouse",
  onDelete: "cascade",
  onUpdate: "cascade",
});

db.sync()
  .then(() => {
    console.log("tenant_info table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create tenant_info table", error);
  });

module.exports = tenantRegistration;
