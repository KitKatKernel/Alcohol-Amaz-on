const router = require('express').Router();
const { Project } = require('../models');

// Render the homepage with all projects
router.get('/', async (req, res) => {
  try {
    const projectData = await Project.findAll(); // Fetch all projects from the database
    const projects = projectData.map((project) => project.get({ plain: true })); // Serialize data

    res.render('home', {
      projects, // Pass projects data to the template
      logged_in: req.session.logged_in // Pass login status to the template
    });
  } catch (err) {
    res.status(500).json(err); // Send error response if something goes wrong
  }
});

// Render the login page
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile'); // Redirect to profile if already logged in
    return;
  }

  res.render('login'); // Render the login template
});

// Render the profile page
router.get('/profile', async (req, res) => {
  if (!req.session.logged_in) {
    res.redirect('/login'); // Redirect to login if not logged in
    return;
  }

  try {
    const projectData = await Project.findAll({
      where: {
        user_id: req.session.user_id // Fetch projects for the logged-in user
      }
    });

    const projects = projectData.map((project) => project.get({ plain: true })); // Serialize data

    res.render('profile', {
      projects, // Pass projects data to the template
      logged_in: req.session.logged_in // Pass login status to the template
    });
  } catch (err) {
    res.status(500).json(err); // Send error response if something goes wrong
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
