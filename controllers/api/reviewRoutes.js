const router = require('express').Router();
const { Review, User, Beverage } = require('../../models');

// Get all Reviews
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: User }, { model: Beverage }],
    });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get Reviews by Beverage ID
router.get('/beverage/:beverage_id', async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { beverage_id: req.params.beverage_id },
      include: [{ model: User }, { model: Beverage }],
    });

    if (reviews.length === 0) {
      res.status(404).json({ message: 'No reviews found for this beverage!' });
      return;
    }

    res.render('reviews', {
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create new Review
router.post('/', async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Update Review by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedReview = await Review.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!updatedReview[0]) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }
    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete Review by ID
router.delete('/:id', async (req, res) => {
  try {
    const reviewData = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });
    if (!reviewData) {
      res.status(404).json({ message: 'No review found with this id!' });
      return;
    }
    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
