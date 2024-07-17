'use strict';
const {
  Model
} = require('sequelize');
const User = require('./../models/user');

module.exports = (sequelize, DataTypes) => {
  class Priority extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Priority.init({
    name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
    },
  }, {
    sequelize,
    tableName:'priorities',
    modelName: 'Priority',
    paranoid: true,

    // If you want to give a custom name to the deletedAt column
    createdAt:'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  });
  Priority.associate=models=>{
    Priority.hasMany(models.Ticket,{foreignKey:'priority_id'});
  }
  return Priority;
};