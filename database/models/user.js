"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(role)
    }
  }
  User.init(
    {
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
      updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },

      password: DataTypes.STRING,

      gender: DataTypes.STRING,
      role: DataTypes.INTEGER,
      status: DataTypes.STRING,

      user_id: {
        type: DataTypes.INTEGER,

        references: {
          // This is a reference to another model
          model: User,

          // This is the column name of the referenced model
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      paranoid: true,
      tableName: "users",
      // If you want to give a custom name to the deletedAt column
      createdAt: "created_at",
      updatedAt: "updated_at",
      deletedAt: "deleted_at",
    }
  );

  
  return User;
};