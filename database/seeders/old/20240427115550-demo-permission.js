"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here
     */
    await queryInterface.bulkInsert("permissions", [
      {
        name: "create_role",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "read_role",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { name: "update_role", created_at: new Date(), updated_at: new Date() },
      { name: "delete_role", created_at: new Date(), updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    return await queryInterface.bulkDelete("permissions", null, {});
  },
};
