"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("permissions", [
      {
        name: "create_record",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "read_record",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { name: "update_record" ,
      created_at: new Date(),
        updated_at: new Date()},
      { name: "delete_record",
      created_at: new Date(),
        updated_at: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return await queryInterface.bulkDelete('permissions', null, {});
  },
};
