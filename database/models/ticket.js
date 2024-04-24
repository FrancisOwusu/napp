'use strict';
const {
  Model
,DataTypes} = require('sequelize');
// const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Ticket.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    ticket_number: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    assignee_id: DataTypes.INTEGER,
    assigner_id:  DataTypes.INTEGER,
    details: DataTypes.TEXT,
    category_id:  DataTypes.INTEGER,
    priority_id:DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Ticket',
    paranoid: true,

    // If you want to give a custom name to the deletedAt column
    // deleted_at: 'destroyTime',
  });
  return Ticket;
};