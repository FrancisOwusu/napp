'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Role.init({
    name: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,

      references: {
        // This is a reference to another model
        model: user,

        // This is the column name of the referenced model
        key: 'id',

        },
      }
  }, {
    sequelize,
    modelName: 'Role',
    paranoid: true,
    tableName: 'roles',
    // If you want to give a custom name to the deletedAt column
    createdAt:'created_at',
    updatedAt:'updated_at',
    deletedAt: 'deleted_at',

  });
  return Role;
};