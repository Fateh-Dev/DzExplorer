const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const sequelize = require("../config/database");

const db = {};

// Load all .model.js files
fs.readdirSync(__dirname)
  .filter(file => file.endsWith(".model.js"))
  .forEach(file => {
    const modelDefiner = require(path.join(__dirname, file));
    const model = modelDefiner(sequelize);
    db[model.name] = model;
  });

// If you have associations, define them here
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
