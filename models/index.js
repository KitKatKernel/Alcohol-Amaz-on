const User = require('./User');
const Review = require('./Review');
const Beverage = require('./Beverage');
const Ingredient = require('./Ingredient');
const List = require('./List');
const Order = require('./Order');

// User associations
User.hasMany(Review, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Review.belongsTo(User, { foreignKey: 'user_id' });

User.belongsToMany(Beverage, { through: 'saved_recipes', foreignKey: 'user_id' });
Beverage.belongsToMany(User, { through: 'saved_recipes', foreignKey: 'beverage_id' });

User.belongsToMany(Ingredient, { through: 'user_ingredients', foreignKey: 'user_id' });
Ingredient.belongsToMany(User, { through: 'user_ingredients', foreignKey: 'ingredient_id' });

// Order associations
User.hasMany(Order, { foreignKey: 'user_id', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Beverage associations
Beverage.hasMany(Review, { foreignKey: 'beverage_id', onDelete: 'CASCADE' });
Review.belongsTo(Beverage, { foreignKey: 'beverage_id' });

Beverage.belongsToMany(Ingredient, { through: 'beverage_ingredients', foreignKey: 'beverage_id' });
Ingredient.belongsToMany(Beverage, { through: 'beverage_ingredients', foreignKey: 'ingredient_id' });

Beverage.hasMany(List, { foreignKey: 'beverage_id', onDelete: 'CASCADE' });
List.belongsTo(Beverage, { foreignKey: 'beverage_id' });

module.exports = { User, Review, Beverage, Ingredient, List, Order };
