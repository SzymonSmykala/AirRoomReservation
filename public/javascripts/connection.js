
const sqlite3 = require('sqlite3').verbose();
const path = require('path')
const Sequelize = require("sequelize");


const dbPath = path.resolve(__dirname, 'database.db')

let db = new sqlite3.Database(dbPath);



const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: dbPath
});


module.exports = sequelize;
global.sequelize = sequelize;