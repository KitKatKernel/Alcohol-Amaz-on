const sequelize = require('../config/connection');
const { User, Review, Beverage, Ingredient, BeverageIngredient, List } = require('../models');

const userData = require('./userData.json');
const reviewData = require('./reviewData.json');
const beverageData = require('./beverageData.json');
const ingredientData = require('./ingredientData.json');
const beverageIngredientData = require('./beverageIngredientData.json');
const listData = require('./listData.json');

const seedDatabase = async () => {
  try {
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

    // Seed Beverages with img_url
    const beverages = await Beverage.bulkCreate(beverageData.map(bev => ({
      name: bev.name,
      description: bev.description,
      img_url: bev.img_url, // Include img_url
    })), {
      returning: true,
    });

    // Seed BeverageIngredients
    await BeverageIngredient.bulkCreate(beverageIngredientData, {
      returning: true,
    });

    // Seed Reviews using beverage_id directly
    const reviews = await Promise.all(
      reviewData.map(async review => {
        const beverage = beverages.find(b => b.id === review.beverage_id);

        if (!beverage) {
          console.error(`Beverage with ID ${review.beverage_id} not found for review:`, review);
          return null;
        }

        return Review.create({
          user_id: review.user_id,
          beverage_id: review.beverage_id,
          review: review.review,
          rating: review.rating
        });
      })
    );

    // we're gonna filter out any null values from reviews
    const validReviews = reviews.filter(review => review !== null);

    const lists = await List.bulkCreate(listData, {
      returning: true,
    });

    console.log('Seeding complete!');
    process.exit(0);
  } catch (err) {
    console.error('Error during seeding:', err);
    process.exit(1);
  }
};

seedDatabase();
