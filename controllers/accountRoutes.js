const router = require('express').Router();
const { User, Order, Beverage, Review } = require('../models');
const withAuth = require('../utils/auth');

// Render the account page with user's orders, submitted recipes, and reviews
router.get('/', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    // Fetch the user's orders
    const orderData = await Order.findAll({
      where: { user_id: userId },
    });
    const orders = orderData.map(order => order.get({ plain: true }));

    // Fetch the user's submitted recipes
    const beverageData = await Beverage.findAll({
      where: { user_id: userId },
    });
    const beverages = beverageData.map(beverage => beverage.get({ plain: true }));

    // Fetch the user's submitted reviews
    const reviewData = await Review.findAll({
      where: { user_id: userId },
      include: [{ model: Beverage, attributes: ['name'] }],
    });
    const reviews = reviewData.map(review => review.get({ plain: true }));

    res.render('account', {
      orders,
      beverages,
      reviews,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err); 
    res.status(500).json(err);
  }
});

module.exports = router;
