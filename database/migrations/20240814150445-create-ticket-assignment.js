'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ticket_assignments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
   
      ticket_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      assigned_to: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      assigned_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      reassigned_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    },
    updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
    }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('ticket_assignments');
  }
};