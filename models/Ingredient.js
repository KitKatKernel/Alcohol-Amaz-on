const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


class Ingredient extends Model {}

Ingredient.init(
  {
    // Ingredient ID: Primary key, auto-incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Ingredient name
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'ingredient',
  }
);

module.exports = Ingredient;
