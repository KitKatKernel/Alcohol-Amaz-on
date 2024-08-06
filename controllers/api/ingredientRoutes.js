const router = require('express').Router();
const { Ingredient } = require('../../models');

// Get all ingredients
router.get('/', async (req, res) => {
  try {
    const ingredients = await Ingredient.findAll();
    res.status(200).json(ingredients);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single ingredient by ID
router.get('/:id', async (req, res) => {
  try {
    const ingredient = await Ingredient.findByPk(req.params.id);
    if (!ingredient) {
      res.status(404).json({ message: 'No ingredient found with this id!' });
      return;
    }
    res.status(200).json(ingredient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new ingredient
router.post('/', async (req, res) => {
  try {
    const newIngredient = await Ingredient.create(req.body);
    res.status(200).json(newIngredient);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update ingredient by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedIngredient = await Ingredient.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedIngredient[0]) {
      res.status(404).json({ message: 'No ingredient found with this id!' });
      return;
    }
    res.status(200).json(updatedIngredient);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete ingredient by ID
router.delete('/:id', async (req, res) => {
  try {
    const ingredientData = await Ingredient.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!ingredientData) {
      res.status(404).json({ message: 'No ingredient found with this id!' });
      return;
    }
    res.status(200).json(ingredientData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
