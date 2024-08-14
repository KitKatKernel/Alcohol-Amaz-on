const router = require('express').Router();
const { User, Review, Beverage, List, Ingredient } = require('../../models');

// Register a new User
router.post('/register', async (req, res) => {
  try {
    if (req.body.age < 21) {
      return res.status(403).json({ message: 'You must be 21 or older to register.' });
    }

    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      // Redirect to the home page for now
      res.redirect('/'); // Maybe the user page later, but I'll need to set it up, something like ('/account');
      console.log(newUser)
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Login a User
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });
    if (!userData || !userData.checkPassword(req.body.password)) {
      res.status(400).json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;
      req.session.user = {
        id: userData.id,
        age: userData.age
      };
      // res.json({ user: userData, message: 'You are now logged in!' });
      res.redirect('/')
      return
    });
    
  } catch (err) {
    res.status(400).json(err);
  }
});

// Logout a User
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Get all Users
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single User by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        { model: Review },
        { model: Beverage, through: 'saved_recipes' },
        { model: List, include: [{ model: Beverage, include: [Ingredient] }] }
      ],
    });
    if (!user) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a User by ID
router.put('/:id', async (req, res) => {
  try {
    if (req.body.age && req.body.age < 21) {
      return res.status(403).json({ message: 'You must be 21 or older.' });
    }

    const updatedUser = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
      individualHooks: true,
    });
    if (!updatedUser[0]) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a User by ID
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!userData) {
      res.status(404).json({ message: 'No user found with this id!' });
      return;
    }
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
