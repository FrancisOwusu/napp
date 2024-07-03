'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('tickets', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            details: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            ticket_number: {
                type: DataTypes.STRING,
                allowNull: false
            },
            user_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'users',
                    },
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE'
            },
            assignee_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'users',
                        // schema: 'schema',
                    },
                    key: 'id',
                },
                allowNull: true,
                onDelete: 'CASCADE'
            },
            assigner_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'users',
                        // schema: 'schema',
                    },
                    key: 'id',
                },
                allowNull: true,
                onDelete: 'CASCADE'
            },
        
            category_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'categories',
                        // schema: 'schema',
                    },
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE'
            },
            priority_id: {
                type: Sequelize.DataTypes.INTEGER,
                references: {
                    model: {
                        tableName: 'priorities',
                        // schema: 'schema',
                    },
                    key: 'id',
                },
                allowNull: false,
                onDelete: 'CASCADE'
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
        await queryInterface.dropTable('tickets');
    }
};
