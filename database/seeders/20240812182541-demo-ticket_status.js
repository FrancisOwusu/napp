'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert("ticket_statuses", [
   
      {
        name: "Completed",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      { name: "In_Progress" ,
      created_at: new Date(),
        updated_at: new Date()},
      { name: "Closed",
      created_at: new Date(),
        updated_at: new Date() },
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
