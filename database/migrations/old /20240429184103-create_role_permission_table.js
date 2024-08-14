'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('role_permission', {
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model:{
            tableName: 'roles',
           
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
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('role_permission');
  }
};

