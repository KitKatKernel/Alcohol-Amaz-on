const router = require('express').Router();
const { Beverage, Ingredient, Review, BeverageIngredient } = require('../../models');
const withAuth = require('../../utils/auth');

// Get all beverages recipes
router.get('/', async (req, res) => {
  try {
    const beverageData = await Beverage.findAll({
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
        ['name', 'ASC'] // Order the beverages alphabetically by name
      ]
    });

    if (beverageData.length === 0) {
      return res.status(404).json({ message: 'No beverages found!' });
    }

    // Map beverage data to plain objects
    const beverages = beverageData.map(beverage => beverage.get({ plain: true }));

    res.status(200).json(beverages);
  } catch (err) {
    console.error('Error fetching beverages:', err.message);
    res.status(500).json(err);
  }
});

// Get a single beverage recipe by ID
router.get('/:id', async (req, res) => {
  try {
    const beverageData = await Beverage.findByPk(req.params.id, {
      include: [
        {
          model: Ingredient,
          attributes: ['id', 'name'], // Include only necessary attributes from Ingredient
          through: {
            model: BeverageIngredient,
            attributes: ['parts'], // Include parts from the join table
          },
        },
        { model: Review }, // Include associated reviews
      ],
    });

    if (!beverageData) {
      return res.status(404).json({ message: 'No beverage found with this id!' });
    }

    // Map the beverage data to a plain object
    const beverage = beverageData.get({ plain: true });

    res.render('beverage', {
      beverage,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    console.error('Error fetching beverage by ID:', err.message);
    res.status(500).json(err);
  }
});

// Create a beverage recipe
router.post('/', withAuth, async (req, res) => {
  try {
    const { beverageName, description, ingredients } = req.body;

    console.log('Received data:', req.body);

    const newBeverage = await Beverage.create({
      name: beverageName,
      description,
      user_id: req.session.user_id,
    });

    console.log('Created beverage:', newBeverage);

    for (const ingredient of ingredients) {
      console.log('Adding ingredient:', ingredient);

      await BeverageIngredient.create({
        beverage_id: newBeverage.id,
        ingredient_id: parseInt(ingredient.id, 10),
        parts: parseInt(ingredient.parts, 10),
      });

      console.log('Ingredient added:', ingredient);
    }

    res.status(200).json(newBeverage);
  } catch (err) {
    console.error('Error creating beverage:', err);
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
      return res.status(404).json({ message: 'No beverage found with this id!' });
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
      return res.status(404).json({ message: 'No beverage found with this id!' });
    }
    res.status(200).json(beverageData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
