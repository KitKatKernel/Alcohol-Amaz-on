const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const accountRoutes = require('./accountRoutes');

// Use homeRoutes for all routes starting with '/'
router.use('/', homeRoutes);

// Use apiRoutes for all routes starting with '/api'
router.use('/api', apiRoutes);

// Use accountRoutes for all routes starting with '/account'
router.use('/account', accountRoutes);

module.exports = router;
