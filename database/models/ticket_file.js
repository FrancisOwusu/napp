'use strict';
const {
  Model
,DataTypes} = require('sequelize');
// const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class TicketFile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TicketFile.init({
    ticket_id: DataTypes.INTEGER,
    filename: DataTypes.STRING,
    filepath: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'TicketFile',
    tableName:'ticket_files',
    // paranoid: true,

    createdAt:'created_at',
    updatedAt:'updated_at',
    // If you want to give a custom name to the deletedAt column
    // deletedAt: 'deleted_at',
  
  });
  return TicketFile;
};