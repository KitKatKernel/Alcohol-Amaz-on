const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class BeverageIngredient extends Model {}

BeverageIngredient.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    beverage_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'beverage',
        key: 'id',
      },
    },
    ingredient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ingredient',
        key: 'id',
      },
    },
    parts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'beverage_ingredient',
  }
);

module.exports = BeverageIngredient;
