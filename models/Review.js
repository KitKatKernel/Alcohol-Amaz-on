const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Review model definition
class Review extends Model {}

module.exports = Review;
