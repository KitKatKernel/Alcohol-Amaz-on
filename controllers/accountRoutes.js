const router = require('express').Router();
const { User, Order, Beverage } = require('../models');
const withAuth = require('../utils/auth');

// Render the account page with user's orders and submitted recipes
router.get('/', withAuth, async (req, res) => {
  try {
    const userId = req.session.user_id;

    // Fetch the user's orders
    const orderData = await Order.findAll({
      where: { user_id: userId },
    });
    const orders = orderData.map(order => order.get({ plain: true }));
    console.log('Orders:', orders); // Debugging log 1

    // Fetch the user's submitted recipes
    const beverageData = await Beverage.findAll({
      where: { user_id: userId },
    });
    const beverages = beverageData.map(beverage => beverage.get({ plain: true }));
    console.log('Beverages:', beverages); // Debugging log 2

    res.render('account', {
      orders,
      beverages,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    console.error(err); // Debugging log
    res.status(500).json(err);
  }
});

module.exports = router;
