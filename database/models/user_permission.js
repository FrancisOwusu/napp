"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserPermission extends Model {
    static associate(models) {
      // define association here
    }
  }
  UserPermission.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false},
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
      },
    },
    {
      sequelize,
      modelName: "UserPermission",
      tableName: "user_permissions",
      createdAt: "created_at",
      updatedAt: "updated_at",
      // paranoid: true,
      // // If you want to give a custom name to the deletedAt column
      deletedAt: "deleted_at",
    }
  );

  return UserPermission;
};





