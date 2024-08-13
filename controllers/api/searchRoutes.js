const express = require('express');
const router = express.Router();
const { Beverage, Ingredient, BeverageIngredient } = require('../../models');
const { Op } = require('sequelize');

router.get('/search', async (req, res) => {
  try {
    const searchQuery = req.query.query;
    console.log('Search Query:', searchQuery);

    if (!searchQuery) {
      return res.status(400).render('searchResults', {
        message: 'No search query provided.',
        logged_in: req.session.logged_in
      });
    }

    const beverages = await Beverage.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.iLike]: `%${searchQuery}%` } },
          { '$ingredients.name$': { [Op.iLike]: `%${searchQuery}%` } }
        ]
      },
      include: [
        {
          model: Ingredient,
          attributes: ['id', 'name'], // Include only necessary attributes from Ingredient
          through: {
            model: BeverageIngredient,
            attributes: ['parts'], // Include parts from the join table
          },
        }
      ],
      order: [
        ['name', 'ASC']
      ]
    });

    if (beverages.length === 0) {
      console.log('No beverages found matching the query');
      return res.status(404).render('searchResults', {
        message: 'No beverages found matching your search query.',
        logged_in: req.session.logged_in
      });
    }

    console.log('Beverages Found:', beverages.map(b => b.name));
    beverages.forEach(beverage => {
      console.log(`Ingredients for ${beverage.name}:`, beverage.ingredients.map(i => i.name));
    });

    res.render('searchResults', {
      beverages: beverages.map(beverage => beverage.get({ plain: true })),
      searchQuery,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error('Error during search:', err.message);
    res.status(500).render('searchResults', {
      message: 'An error occurred while processing your search. Please try again later.',
      logged_in: req.session.logged_in
    });
  }
});

module.exports = router;
