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



// Render a single project's details
router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id); // Fetch project by ID
    const project = projectData.get({ plain: true }); // Serialize data

    res.render('project', {
      project, // Pass project data to the template
      logged_in: req.session.logged_in // Pass login status to the template
    });
  } catch (err) {
    res.status(500).json(err); // Send error response if something goes wrong
  }
});

module.exports = router;
