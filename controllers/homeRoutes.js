const router = require('express').Router();
const { Beverage, Ingredient } = require('../models');
const withAuth = require('../utils/auth');

// Render the homepage with all beverages
router.get('/', async (req, res) => {
  try {
    const beverageData = await Beverage.findAll({
      include: [{ model: Ingredient }],
    }); // Fetch all beverages from the database
    const beverages = beverageData.map((beverage) => beverage.get({ plain: true })); // Serialize data

    res.render('home', {
      beverages, // Pass beverages data to the template
      logged_in: req.session.logged_in // Pass login status to the template
    });
  } catch (err) {
    res.status(500).json(err); // Send error response if something goes wrong
  }
});

// Render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/'); // Redirect to profile if already logged in
    return;
  }

  res.render('login'); // Render the login template
});

// Render the profile page
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Fetch all ingredients from the database
    const ingredientData = await Ingredient.findAll();
    const ingredients = ingredientData.map(ingredient => ingredient.get({ plain: true })); // Serialize data

    // Render the profile page with the ingredients
    res.render('profile', {
      ingredients, 
      user: req.session.user, 
      logged_in: req.session.logged_in, 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the cart page
router.get('/cart', withAuth, (req, res) => {
  const cart = req.session.cart || []; // Get the cart from the session, or an empty array if not present
  res.render('cart', {
    cart, // Pass cart data to the template
    logged_in: req.session.logged_in, // Pass login status to the template
  });
});

// Add ingredients of a beverage to the cart
router.post('/cart', withAuth, async (req, res) => {
  const { beverageId } = req.body;

  try {
    const beverage = await Beverage.findByPk(beverageId, {
      include: [{ model: Ingredient }],
    });

    if (!beverage) {
      res.status(404).json({ message: 'Beverage not found' });
      return;
    }

    const cartItems = beverage.ingredients.map(ingredient => ({
      id: ingredient.id,
      name: ingredient.name,
    }));

    if (!req.session.cart) {
      req.session.cart = [];
    }

    req.session.cart.push(...cartItems);
    res.status(200).json({ message: 'Ingredients added to cart', cart: req.session.cart });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render a single beverage's details
router.get('/beverage/:id', async (req, res) => {
  try {
    // Fetch the beverage by ID including its ingredients
    const beverageData = await Beverage.findByPk(req.params.id, {
      include: [{ model: Ingredient }],
    });
    const beverage = beverageData.get({ plain: true }); // Serialize data

    // Render the beverage.handlebars template and pass the beverage data
    res.render('beverage', {
      beverage, 
      logged_in: req.session.logged_in // Pass login status to the template
    });
  } catch (err) {
    res.status(500).json(err); // Send error response if something goes wrong
  }
});

module.exports = router;
