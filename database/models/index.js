'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const user = require('./user');
const role_permission = require('./role_permission');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read all files in the current directory except for index.js
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
  console.log(file)
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    // console.log(model);
    db[model.name] = model;

  });

  // Run associations if defined
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// sequelize.sync({ /* sync options */ }).then(() => {
//  console.log("all d")
// });


db.sequelize = sequelize;
db.Sequelize = Sequelize;

user.associate = (models) => {
  user.belongsToMany(models.role, { through: "RoleUser" });
};

 role_permission.associate = models => {
  role_permission.belongsTo(models.role, { foreignKey: 'role_id' });
  role_permission.belongsTo(models.permission, { foreignKey: 'permission_id' });
  };


db.Role.hasMany(db.User,{targetKey:'id',foreignKey:'user_id'});
db.User.belongsTo(db.Role,{targetKey:'id',foreignKey:'user_id'});
//Relationship.
module.exports =db;

