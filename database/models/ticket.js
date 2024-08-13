"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  Ticket.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      details: {
        allowNull: true,
        type: DataTypes.TEXT,
      },
      ticket_number: {
        type: DataTypes.STRING,
        unique: true,
      },
      user_id: DataTypes.INTEGER,
      assignee_id: DataTypes.INTEGER,
      assigner_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      priority_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Ticket",
      tableName: "tickets",
      paranoid: true,
      resolvedAt: {
        type: DataTypes.DATE,
        allowNull: true, // Allow null for unresolved tickets
      },
      
      createdAt: "created_at",
      updatedAt: "updated_at",
      // If you want to give a custom name to the deletedAt column
      deletedAt: "deleted_at",
    }
  );
  Ticket.associate = (models) => {
    Ticket.belongsTo(models.Category, {
      foreignKey: "category_id",
      as: "category",
    });
    Ticket.belongsTo(models.Priority, {
      foreignKey: "priority_id",
      as: "priority",
    });
    Ticket.belongsTo(models.User, {
      foreignKey: "user_id",
      as: "user",
    });
    Ticket.belongsTo(models.User,{
      foreignKey:"assignee_id",
      as:"ticket_assignee"
    });
    Ticket.belongsTo(models.User,{
      foreignKey:"assigner_id",
      as:"ticket_assigner"
    });
    Ticket.belongsTo(models.TicketStatus,{
      foreignKey:"status_id",
      as:"status"
    });

  };
  return Ticket;
};
