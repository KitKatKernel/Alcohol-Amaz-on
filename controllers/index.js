const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');

// Use homeRoutes for all routes starting with '/'
router.use('/', homeRoutes);

// Use apiRoutes for all routes starting with '/api'
router.use('/api', apiRoutes);

module.exports = router;
