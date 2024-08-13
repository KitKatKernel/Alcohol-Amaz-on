const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// List model definition
class List extends Model {}

List.init(
  {
    // List ID: Primary key, auto-incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // ID of the beverage listed: Foreign key referencing Beverage model
    beverage_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'beverage',
        key: 'id',
      },
    },
    // Price of beverage
    prices: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'list',
  }
);

module.exports = List;
