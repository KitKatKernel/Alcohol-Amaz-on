// Imports the Sequelize library
const Sequelize = require('sequelize');
// Utilizes the 'dotenv' package in order to load the .env file and sets the environment variables to the process.env object.
require('dotenv').config();

let sequelize;

// Checks if the application is deployed using the DB_URL environment variable
if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Necessary for self-signed certificates
      }
    }
  });
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'postgres',
      port: 5432
    }
  );
}

module.exports = sequelize;
