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

    await queryInterface.bulkInsert("ticket_statuses", [
      {
        name: "New",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Open",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "On Hold",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Escalated",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Pending",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Resolved",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Closed",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Reopened",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Canceled",
        created_at: new Date(),
        updated_at: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('ticket_statuses', null, {});
  },
};
