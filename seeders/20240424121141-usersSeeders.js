'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('katindi1@', 10);

    return queryInterface.bulkInsert('Users', [
      {
        email: "lamech",
        password:hashedPassword,
        role: "admin",
        verified: true,
        Active: "active",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});

  }
};
