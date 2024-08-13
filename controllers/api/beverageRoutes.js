const router = require('express').Router();
const { Beverage, Ingredient, Review, BeverageIngredient } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all beverages recipes
router.get('/', async (req, res) => {
  try {
    const beverages = await Beverage.findAll({
      include: [{ model: Ingredient }],
    });
    res.status(200).json(beverages);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single beverage recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const beverage = await Beverage.findByPk(req.params.id, {
      include: [
        { model: Ingredient },
        { model: Review },
      ],
    });

    if (!beverage) {
      res.status(404).json({ message: 'No beverage found with this id!' });
      return;
    }

    res.render('beverage', {
      beverage: beverage.get({ plain: true }), // Pass the beverage data as a plain object
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a beverage recipe.
router.post('/', withAuth, async (req, res) => {
  try {
    const { beverageName, description, ingredients } = req.body;
    console.log(req.body); // Log the request body

    // Create the beverage
    const newBeverage = await Beverage.create({
      name: beverageName,
      description,
      user_id: req.session.user_id,
    });

    // Add ingredients to the beverage
    for (const ingredient of ingredients) {
      console.log(ingredient); // Log each ingredient
      await BeverageIngredient.create({
        beverage_ids: newBeverage.id,
        ingredient_ids: parseInt(ingredient.id, 10),
        parts: parseInt(ingredient.parts, 10),
      });
    }

    res.status(200).json(newBeverage);
  } catch (err) {
    console.error(err); // Log the error
    res.status(400).json(err);
  }
});

// Update a beverage by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedBeverage = await Beverage.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedBeverage[0]) {
      res.status(404).json({ message: 'No beverage found with this id!' });
      return;
    }
    res.status(200).json(updatedBeverage);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a beverage by ID
router.delete('/:id', async (req, res) => {
  try {
    const beverageData = await Beverage.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!beverageData) {
      res.status(404).json({ message: 'No beverage found with this id!' });
      return;
    }
    res.status(200).json(beverageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
