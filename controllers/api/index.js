const router = require('express').Router();
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');
const beverageRoutes = require('./beverageRoutes');
const ingredientRoutes = require('./ingredientRoutes');
const listRoutes = require('./listRoutes');

router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
router.use('/beverages', beverageRoutes);
router.use('/ingredients', ingredientRoutes);
router.use('/lists', listRoutes);

module.exports = router;