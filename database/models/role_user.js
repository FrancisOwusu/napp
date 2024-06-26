"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoleUser extends Model {
    // static associate(models) {
    //   // define association here
    // }
  }
  RoleUser.init(
    {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
    },
    {
      sequelize,
      modelName: "RoleUser",
      tableName: "role_user",

      // paranoid: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      // If you want to give a custom name to the deletedAt column
      deletedAt: "deleted_at",
    }
  );

  return RoleUser;
};
