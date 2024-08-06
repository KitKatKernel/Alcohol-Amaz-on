const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Review model definition
class Review extends Model {}

Review.init(
  {
    // Review ID: Primary key auto-incremented
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // Foreign key referencing User model
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    // Foreign key referencing Beverage model
    beverage_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'beverage',
        key: 'id',
      },
    },
    // Review text
    review: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'review',
  }
);

module.exports = Review;
