"use strict";
const { Model, Sequelize } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
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
  // Define custom instance method to add a role to a user
  // User.prototype.addRole = async function(roleName) {
  //   try {
  //       // Find the role by name
  //       const role = await role.findOne({ where: { name: roleName } });

  //       if (!role) {
  //           throw new Error(`Role "${roleName}" not found.`);
  //       }

  //       // Add the role to the user
  //       await this.addRole(role);
  //       console.log(`Role "${roleName}" added to user "${this.name}" successfully.`);
  //   } catch (error) {
  //       console.error('Error adding role to user:', error);
  //   }
  // };
  return User;
};
