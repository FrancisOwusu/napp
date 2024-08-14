'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable('user_permissions', { 
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:{
            tableName: 'users'
          },
          key: 'id'
        }
      },
      permission_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:{
            tableName: 'permissions'
          },
          key: 'id'
        }
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
     });
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable('user_permission');
  }
};
