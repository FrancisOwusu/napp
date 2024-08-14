"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("tickets", 'status_id', {
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: {
            tableName: "ticket_statuses",
            // schema: 'schema',
          },
          key: "id",
        },
        allowNull: true,
        onDelete: "CASCADE",
      },
    );

    await queryInterface.addColumn('tickets', 'resolved_at', {
      type: Sequelize.DATE,
      allowNull: true, // This allows the column to be null if the ticket hasn't been resolved yet
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     // Remove 'priority' column
     await queryInterface.removeColumn('tickets', 'status_id');
     await queryInterface.removeColumn('tickets', 'resolved_at');
  },
};
