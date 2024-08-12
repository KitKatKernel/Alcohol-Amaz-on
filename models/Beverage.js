const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Beverage extends Model {}

Beverage.init(
  {
    // Beverage ID: Primary key, auto-incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Beverage name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // Beverage description
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'beverage',
  }
);

module.exports = Beverage;
