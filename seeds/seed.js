const sequelize = require('../config/connection');
const { User, Review, Beverage, Ingredient, List } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const beverageData = require('./beverageData.json');
const ingredientData = require('./ingredientData.json');
const listData = require('./listData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed Users
  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed Ingredients
  const ingredients = await Ingredient.bulkCreate(ingredientData, {
    returning: true,
  });

  // Seed Beverages
  const beverages = await Beverage.bulkCreate(beverageData.map(bev => ({ name: bev.name, description: bev.description })), {
    returning: true,
  });

  // Add ingredients to each beverage
  for (const beverage of beverageData) {
    const bev = beverages.find(b => b.name === beverage.name);
    await bev.addIngredients(beverage.ingredient_ids);
  }

  // Seed Lists
  const lists = await List.bulkCreate(listData, {
    returning: true,
  });

  // Seed Reviews
  const reviews = await Review.bulkCreate(reviewData, {
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
