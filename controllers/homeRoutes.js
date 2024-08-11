const router = require('express').Router();
const { Beverage, User, Ingredient } = require('../models');
const withAuth = require('../utils/auth');

// Render the homepage with all projects
router.get('/', async (req, res) => {
  try {
    const beverageData = await Beverage.findAll({
      include: [{ model: Ingredient }],
    }); // Fetch all projects from the database
    const beverages = beverageData.map((project) => project.get({ plain: true })); // Serialize data

    res.render('home', {
      beverages, // Pass projects data to the template
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
    // We're grabbing all the ingredients from the database here
    const ingredientData = await Ingredient.findAll();

    // Turning Sequelize objects into plain JavaScript objects so Handlebars can understand them
    const ingredients = ingredientData.map(ingredient => ingredient.get({ plain: true }));

    // passing in the ingredients we fetched, along with sess info
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

// Add a beverage to the cart
router.post('/cart', withAuth, async (req, res) => {
  const { beverageId } = req.body; // Extract the beverageId from the request body

  try {
    // Fetch the beverage by ID
    const beverage = await Beverage.findByPk(beverageId, {
      include: [{ model: Ingredient }],
    });

    if (!beverage) {
      res.status(404).json({ message: 'Beverage not found' }); // Send error if the beverage isn't found
      return;
    }

    // Create a cart item
    const cartItem = {
      id: beverage.id,
      name: beverage.name,
      description: beverage.description,
      ingredients: beverage.ingredients.map(ing => ing.name),
    };

    // Initialize the cart in the session if it doesn't exist
    if (!req.session.cart) {
      req.session.cart = [];
    }

    // Add the item to the cart
    req.session.cart.push(cartItem);
    res.status(200).json({ message: 'Item added to cart', cart: req.session.cart });
  } catch (err) {
    res.status(500).json(err); // Send error response if something goes wrong
  }
});

// Render a single beverage's details
router.get('/beverage/:id', async (req, res) => {
  try {
    // Fetch the beverage by ID
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
