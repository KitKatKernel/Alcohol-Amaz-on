const router = require('express').Router();
const { List, Beverage, Ingredient } = require('../../models');

// Get all Lists
router.get('/', async (req, res) => {
  try {
    const lists = await List.findAll({
      include: [
        {
          model: Beverage,
          include: [Ingredient],
        },
      ],
    });
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a List by ID
router.get('/:id', async (req, res) => {
  try {
    const list = await List.findByPk(req.params.id, {
      include: [
        {
          model: Beverage,
          include: [Ingredient],
        },
      ],
    });
    if (!list) {
      res.status(404).json({ message: 'No list found with this id!' });
      return;
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new List
router.post('/', async (req, res) => {
  try {
    const newList = await List.create(req.body);
    res.status(200).json(newList);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update List by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedList = await List.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!updatedList[0]) {
      res.status(404).json({ message: 'No list found with this id!' });
      return;
    }
    res.status(200).json(updatedList);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a List by ID
router.delete('/:id', async (req, res) => {
  try {
    const listData = await List.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!listData) {
      res.status(404).json({ message: 'No list found with this id!' });
      return;
    }
    res.status(200).json(listData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
