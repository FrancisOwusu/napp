'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('ticket_files', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            ticket_id: {
              type: Sequelize.DataTypes.INTEGER,
              references: {
                model: {
                  tableName: 'tickets',
                  // schema: 'schema',
                },
                key: 'id',
              },
              allowNull: false,
              onDelete: 'CASCADE'
            },
            filename: {
                type: Sequelize.STRING,
                allowNull: false
            },
            filepath: {
                type: Sequelize.STRING,
                allowNull: true
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
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('ticket_files');
    }
};
