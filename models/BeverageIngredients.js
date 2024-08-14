const sequelize = require('../config/connection');
const { Model, DataTypes } = require('sequelize');

class BeverageIngredients extends Model {}

BeverageIngredients.init(
  {
    // Beverage ID: Primary key, auto-incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Beverage name
    beverage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'beverage',
        key: 'id',
      }
    },
    // Foreign key referencing Ingredient model's ingredient ID.
    ingredient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ingredient',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'beverage_ingredients',
  }
);

module.exports = BeverageIngredients;
