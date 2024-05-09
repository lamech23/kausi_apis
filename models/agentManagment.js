const { DataTypes } = require("sequelize");
const db = require("../config/Database");
const Details = require("./UploadModals");
const users = require("./UserModels");

const agentManagmentTable = db.define(
  "agentManagments",
  {
    houseId: {
      type: DataTypes.INTEGER,
    },
    agentId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    freezeTablesName: true,
  }
);


agentManagmentTable.belongsTo(Details,{
  foreignKey:"houseId",
  as: 'house',
  onUpdate: "cascade"

})
Details.hasMany(agentManagmentTable,{
  foreignKey:"houseId",
  as: 'agent',
  onUpdate: "cascade"

})

agentManagmentTable.belongsTo(users,{
  foreignKey:"agentId",
  as: 'agent',
  onUpdate: "cascade",
  onDelete: "cascade"

})

users.hasMany(agentManagmentTable,{
  foreignKey:"agentId",
  as: 'agent',
  onUpdate: "cascade"

})


db.sync()
  .then(() => {
    console.log("agentManagmentTable table created successfully!");
  })
  .catch((error) => {
    console.log("Unable to create agentManagmentTable table", error);
  });

 


module.exports = agentManagmentTable;
